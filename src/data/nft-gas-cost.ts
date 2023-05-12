import { NftGasCost } from '@/interfaces/nft'

export default {
  //
  // Note: For EVM, we ignore the very first mint for fair comparison
  //       since the first mint uses more gas than the rest of the mints.
  //
  // Currency
  // - EVM:    wei
  // - Solana: SOL
  //
  evm: {
    normal: 25939, // ERC721
    azuki: 25278, // ERC721A
    enumerable: 114771, // ERC721Enumerable
  },
  solana: {
    normal: 0.012, // uncompressed, SOL
  },
  near: {
    normal: 0.0007480363880607, // NEP-171 (from nft-gas-cost repo)
  },
  algorand: {
    normal: 0.101, // ASA opt-in fee is 0.1 ALGO (to receive token) and transfer fee is 0.001 ALGO
  },
} as NftGasCost
