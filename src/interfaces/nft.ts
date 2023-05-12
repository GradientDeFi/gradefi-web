import { AllChainName } from '@/constants'

export interface NftGasCost {
  // [chain in ChainTypes]: {
  //   [nftType in NftTypes]: number
  // }
  evm: {
    [nftType in NftTypes]: number;
  },
  solana: {
    [nftType in NftTypes]: number;
  }
  near: {
    [nftType in NftTypes]: number;
  }
  algorand: {
    [nftType in NftTypes]: number;
  }
}

export interface AllChainSingularNftTypeMintCostPerChain {
  chainName: AllChainName
  cost: number
  costMultiple: number
}

export type AllChainSingularNftTypeMintCost = AllChainSingularNftTypeMintCostPerChain[]
