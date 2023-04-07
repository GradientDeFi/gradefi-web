import { allChainNames } from '@/constants'

export interface NFTGasCost {
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

export interface NftMintCost10k {
  [chainName: typeof allChainNames[number]]: number
}
