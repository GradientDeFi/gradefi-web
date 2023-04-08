import { AllChainName } from '@/constants/chains'

export interface AllChainNftMintCostPerChain {
  chainName: AllChainName
  costs: { [nftType in NFTTypes]: number }
}

export type AllChainNftMintCost = AllChainNftMintCostPerChain[]
export const nftMintAmountList = [10_000, 1_000_000]

export type NftMintAmount = typeof nftMintAmountList[number]
