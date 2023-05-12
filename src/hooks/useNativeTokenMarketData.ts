import { useEffect, useState } from 'react'

import { allChainNames, AllNativeTokenMarketData, NativeTokenMarketData } from '@/constants'

//
// Using Chainlink Data Feeds (on Polygon)
//
/*
export default function useCryptoPrice(): { [name in AllChainName]: number } {
  const [prices, setPrices] = useState<{ [name in AllChainName]: number }>({})
  const provider = useMemo(() => new ethers.providers.JsonRpcProvider('https://polygon-rpc.com'), [])
  // const contract = useMemo(() => new ethers., [provider])

  return prices
}
*/

//
// Using CoinGecko
//
const geckoChainIds = ['ethereum', 'solana', 'matic-network', 'avalanche-2', 'near', 'binancecoin', 'algorand']

type GeckoTokenMarketDataPartial = {
  id: typeof geckoChainIds[number]
  // symbol: string
  current_price: number
  market_cap: number
  fully_diluted_valuation: number
  circulating_supply: number
  total_supply: number
}

type ParsedGeckoTokenMarketDataPartial = { [name in typeof allChainNames[number]]: Omit<GeckoTokenMarketDataPartial, 'id'> }

const allChainMarketDataInit = allChainNames.reduce((a, v) => ({ ...a, [v]: {} }), {})

function parseGeckoTokenMarketData(data: Omit<GeckoTokenMarketDataPartial, 'id'>, ethMcap: number): NativeTokenMarketData {
  return {
    price: data.current_price,
    //
    // Normalized price: ETH Market Cap / Token Market Cap * Token Price
    //
    priceNormalized: (ethMcap / data.market_cap) * data.current_price,
    //
    mcap: data.market_cap,
    fdv: data.fully_diluted_valuation,
    supplyCirculating: data.circulating_supply,
    supplyTotal: data.total_supply,
  }
}

export default function useNativeTokenMarketData(): AllNativeTokenMarketData {
  const [marketData, setMarketData] = useState<AllNativeTokenMarketData>(allChainMarketDataInit)

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?ids=${geckoChainIds.join(',')}&vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`)
      .then((res) => res.json())
      .then((feed: GeckoTokenMarketDataPartial[]) => feed.reduce((a, v) => ({ ...a, [v.id]: v }), {}))
      .then((feed: ParsedGeckoTokenMarketDataPartial) => {
        const ethMcap = feed.ethereum.market_cap
        return {
          ethereum: parseGeckoTokenMarketData(feed.ethereum, ethMcap),
          solana: parseGeckoTokenMarketData(feed.solana, ethMcap),
          polygon: parseGeckoTokenMarketData(feed['matic-network'], ethMcap),
          polygonZKEVM: parseGeckoTokenMarketData(feed.ethereum, ethMcap), // zkEVM uses ETH as its gas token
          bnbChain: parseGeckoTokenMarketData(feed.binancecoin, ethMcap),
          avalanche: parseGeckoTokenMarketData(feed['avalanche-2'], ethMcap),
          arbitrumOne: parseGeckoTokenMarketData(feed.ethereum, ethMcap), // Arbitrum uses ETH as its gas token
          optimism: parseGeckoTokenMarketData(feed.ethereum, ethMcap), // Optimism uses ETH as its gas token
          near: parseGeckoTokenMarketData(feed.near, ethMcap),
          nearAurora: parseGeckoTokenMarketData(feed.ethereum, ethMcap), // Aurora uses ETH as its gas token
          algorand: parseGeckoTokenMarketData(feed.algorand, ethMcap),
        } as AllNativeTokenMarketData
      })
      .then((mdata) => setMarketData(mdata))
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return marketData
}
