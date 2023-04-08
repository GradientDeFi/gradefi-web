import { useEffect, useState } from 'react'

import {
  AllChainNftMintCost,
  AllChainName,
  EVMGasPrice,
  NativeTokenUsdPrice,
  NftMintAmount,
  evmChainNames,
} from '@/constants'
import nftGasCost from '@/data/nft-gas-cost'
import useEvmProviders from '@/hooks/useEvmProviders'
import useNativeTokenUsdPrice from '@/hooks/useNativeTokenUsdPrice'
import useSolanaCompressedNftCost from '@/hooks/useSolanaCompressedNftCost'

const evmChainBaseGasInit: EVMGasPrice = evmChainNames.reduce((a, v) => ({ ...a, [v]: 0 }), {})

function calcMintGasToUsd(
  chainName: AllChainName,
  baseGasPrice: EVMGasPrice | null,
  mintGas: number,
  prices: NativeTokenUsdPrice,
): number {
  if (evmChainNames.includes(chainName)) {
    return (((baseGasPrice as EVMGasPrice)[chainName] * mintGas) / (10 ** 18)) * prices[chainName]
  }
  if (chainName === 'solana') {
    return mintGas * prices.solana
  }
  return 0
}

export default function useNftMintCost(nftMintAmount: NftMintAmount): AllChainNftMintCost { // cost per mint
  const [baseGas, setBasGas] = useState<EVMGasPrice>(evmChainBaseGasInit)
  const [cost, setCost] = useState<AllChainNftMintCost>([])

  const evmProviders = useEvmProviders()
  const nativeTokenPrices = useNativeTokenUsdPrice()
  const solanaCompressedNormal = useSolanaCompressedNftCost(nftMintAmount)

  useEffect(() => {
    const promises = evmChainNames.map((chainName) => {
      const provider = evmProviders[chainName]
      return provider.getGasPrice() // gas price in wei (BigNumber)
        .then((gasPrice) => Promise.resolve({ [chainName]: gasPrice.toNumber() }))
        .catch((err) => {
          console.error(err)
          return Promise.resolve({ [chainName]: 0 })
        })
    })

    Promise.all(promises)
      .then((results) => {
        console.log(results)
        setBasGas(results.reduce((a, v) => ({ ...a, ...v }), {}))
      })
  }, [evmProviders]) // don't depend on `cost`, otherwise it'll cycle

  useEffect(() => {
    // console.log(baseGas)
    const evmCosts: AllChainNftMintCost = evmChainNames.map((chainName) => ({
      chainName,
      costs: {
        normal: calcMintGasToUsd(chainName, baseGas, nftGasCost.evm.normal, nativeTokenPrices),
        azuki: calcMintGasToUsd(chainName, baseGas, nftGasCost.evm.azuki, nativeTokenPrices),
        enumerable: calcMintGasToUsd(chainName, baseGas, nftGasCost.evm.enumerable, nativeTokenPrices),
      },
    }))

    const solanaNormal = calcMintGasToUsd('solana', null, nftGasCost.solana.normal, nativeTokenPrices)

    const nonEvmCosts: AllChainNftMintCost = [
      {
        chainName: 'solanaCompressed',
        costs: {
          normal: solanaCompressedNormal * nativeTokenPrices.solana,
          azuki: solanaCompressedNormal * nativeTokenPrices.solana,
          enumerable: solanaCompressedNormal * nativeTokenPrices.solana,
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
    ]

    // NOTE: order list by ascending gas price (cheapest first)
    setCost([...evmCosts, ...nonEvmCosts].sort((a, b) => a.costs.normal - b.costs.normal))
  }, [baseGas, nativeTokenPrices, solanaCompressedNormal])

  return cost
}
