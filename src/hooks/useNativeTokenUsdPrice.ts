import { useEffect, useState } from 'react'

import { evmChainNames, NativeTokenUsdPrice } from '@/constants'

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
const geckoChainIds = ['ethereum', 'solana', 'matic-network', 'avalanche-2', 'near', 'binancecoin']

type GeckoPriceFeed = { [name in typeof geckoChainIds[number]]: { usd: number } }

const allChainPriceInit = evmChainNames.reduce((a, v) => ({ ...a, [v]: 0 }), {})

export default function useNativeTokenUsdPrice(): NativeTokenUsdPrice {
  const [prices, setPrices] = useState<NativeTokenUsdPrice>(allChainPriceInit)

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${geckoChainIds.join(',')}&vs_currencies=usd`)
      .then((res) => res.json())
      .then((feed: GeckoPriceFeed) => ({
        ethereum: feed.ethereum.usd,
        solana: feed.solana.usd,
        polygon: feed['matic-network'].usd,
        polygonZKEVM: feed.ethereum.usd, // zkEVM uses ETH as its gas token
        bnbChain: feed.binancecoin.usd,
        avalanche: feed['avalanche-2'].usd,
        arbitrumOne: feed.ethereum.usd, // Arbitrum uses ETH as its gas token
        optimism: feed.ethereum.usd, // Optimism uses ETH as its gas token
        near: feed.near.usd,
        nearAurora: feed.ethereum.usd, // Aurora uses ETH as its gas token
      } as NativeTokenUsdPrice))
      .then((tokenPrices) => setPrices(tokenPrices))
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return prices
}
