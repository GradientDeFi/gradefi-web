import { AllChainName } from '@/constants/chains'

export interface AllChainNftMintCostPerChain {
  chainName: AllChainName
  costs: { [nftType in NftTypes]: number }
}

export type AllChainNftMintCost = AllChainNftMintCostPerChain[]
export const nftMintAmountList = [10_000, 1_000_000]

export type NftMintAmount = typeof nftMintAmountList[number]

// function mint() external payable {} from repo `nft-gas-cost` of ERC721.sol
export const fnSelectorMint = '0x1249c58b'
