import { AllChainName } from '@/constants'

export interface NftGasCost {
  // [chain in ChainTypes]: {
  //   [nftType in NFTTypes]: number
  // }
  evm: {
    [nftType in NFTTypes]: number;
  },
  solana: {
    [nftType in NFTTypes]: number;
  }
}

export interface AllChainSingularNftTypeMintCostPerChain {
  chainName: AllChainName
  cost: number
}

export type AllChainSingularNftTypeMintCost = AllChainSingularNftTypeMintCostPerChain[]
