import { useEffect, useState } from 'react'

import {
  AllChainNftMintCost,
  AllChainName,
  EVMGasPrice,
  NftMintAmount,
  evmChainBaseGas,
  evmChainNames,
  AllNativeTokenMarketData,
} from '@/constants'
import nftGasCost from '@/data/nft-gas-cost'
import useEvmProviders from '@/hooks/useEvmProviders'
import useNativeTokenMarketData from '@/hooks/useNativeTokenMarketData'
import useSolanaCompressedNftCost from '@/hooks/useSolanaCompressedNftCost'

const evmChainBaseGasInit: EVMGasPrice = evmChainNames.reduce((a, v) => ({ ...a, [v]: 0 }), {})

function calcMintGasToUsd(
  chainName: AllChainName,
  baseGasPrice: EVMGasPrice | null,
  mintGas: number,
  marketData: AllNativeTokenMarketData,
  normalized: boolean,
): number {
  let price = 0
  if (chainName in marketData) {
    price = normalized ? marketData[chainName].priceNormalized : marketData[chainName].price
  }

  if (evmChainNames.includes(chainName)) {
    return (((baseGasPrice as EVMGasPrice)[chainName] * mintGas) / (10 ** 18)) * price
  }

  return mintGas * price
}

export default function useNftMintCost(nftMintAmount: NftMintAmount, isPriceNormalized: boolean): AllChainNftMintCost { // cost per mint
  const [baseGas, setBaseGas] = useState<EVMGasPrice>(evmChainBaseGasInit)
  const [cost, setCost] = useState<AllChainNftMintCost>([])

  const evmProviders = useEvmProviders()
  const nativeTokenData = useNativeTokenMarketData()
  const solanaCompressedNormal = useSolanaCompressedNftCost(nftMintAmount)

  useEffect(() => {
    const promises = evmChainNames.map((chainName) => {
      const provider = evmProviders[chainName]
      // Use default or custom base gas calculator for each chain
      return evmChainBaseGas[chainName](provider)
        .then((gasPrice) => Promise.resolve({ [chainName]: gasPrice }))
        .catch((err) => Promise.resolve({ [chainName]: 0 }))
    })

    Promise.all(promises)
      .then((results) => {
        // console.log(results)
        setBaseGas(results.reduce((a, v) => ({ ...a, ...v }), {}))
      })
  }, [evmProviders]) // don't depend on `cost`, otherwise it'll cycle

  useEffect(() => {
    // console.log(baseGas)

    // EVM gas cost to USD conversion
    const evmCosts: AllChainNftMintCost = evmChainNames.map((chainName) => ({
      chainName,
      costs: {
        normal: calcMintGasToUsd(chainName, baseGas, nftGasCost.evm.normal, nativeTokenData, isPriceNormalized),
        azuki: calcMintGasToUsd(chainName, baseGas, nftGasCost.evm.azuki, nativeTokenData, isPriceNormalized),
        enumerable: calcMintGasToUsd(chainName, baseGas, nftGasCost.evm.enumerable, nativeTokenData, isPriceNormalized),
      },
    }))
    // console.log(evmCosts)

    // Non-EVM gas cost to USD conversion
    const solanaNormal = calcMintGasToUsd('solana', null, nftGasCost.solana.normal, nativeTokenData, isPriceNormalized)
    const nearNormal = calcMintGasToUsd('near', null, nftGasCost.near.normal, nativeTokenData, isPriceNormalized)

    const solanaTokenPrice = nativeTokenData.solana[isPriceNormalized ? 'priceNormalized' : 'price']

    const nonEvmCosts: AllChainNftMintCost = [
      {
        chainName: 'solanaCompressed',
        costs: {
          normal: solanaCompressedNormal * solanaTokenPrice,
          azuki: solanaCompressedNormal * solanaTokenPrice,
          enumerable: solanaCompressedNormal * solanaTokenPrice,
        },
      },
      {
        chainName: 'solana',
        costs: {
          normal: solanaNormal,
          azuki: solanaNormal,
          enumerable: solanaNormal,
        },
      },
      {
        chainName: 'near',
        costs: {
          normal: nearNormal,
          azuki: nearNormal,
          enumerable: nearNormal,
        },
      },
    ]

    // NOTE: order list by ascending gas price (cheapest first)
    // TODO: guarantee re-order when nftMintAmount changes
    // TODO: enumerable to option-selected
    setCost([...evmCosts, ...nonEvmCosts].sort((a, b) => a.costs.enumerable - b.costs.enumerable))
  }, [baseGas, nativeTokenData, solanaCompressedNormal, nftMintAmount, isPriceNormalized])

  return cost
}
