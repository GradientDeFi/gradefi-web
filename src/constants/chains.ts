import ethereumIcon from '@/assets/logo/ethereum/ethereum-icon-color.svg'
import polygonIcon from '@/assets/logo/polygon/polygon-icon-color.svg'
import polygonZkEvmIcon from '@/assets/logo/polygon/zkevm-icon-color.png'
import avalancheIcon from '@/assets/logo/avalanche/avalanche-icon-color.svg'
import arbitrumIcon from '@/assets/logo/arbitrum/arbitrum-icon-color.svg'
import solanaIconBlack from '@/assets/logo/solana/solana-icon-black.svg'
import solanaIconColor from '@/assets/logo/solana/solana-icon-color.svg'

export const evmChainNames = ['ethereum', 'polygon', 'polygonZKEVM', 'avalanche', 'arbitrumOne'] // 'zkSyncEra'

export const nonEvmChainNames = ['solana', 'solanaCompressed']

export const allChainNames = [...evmChainNames, ...nonEvmChainNames]

export type EvmChainName = typeof evmChainNames[number]

export type NonEvmChainName = typeof nonEvmChainNames[number]

export type AllChainName = EvmChainName | NonEvmChainName

export type EVMGasPrice = { [name in EvmChainName]: number }

export type AllChainNftMintCost = { [name in AllChainName]: { [nftType in NFTTypes]: number } }

export type NativeTokenUsdPrice = { [name in AllChainName]: number }

export interface ChainDetails {
  [name: typeof allChainNames[number]]: {
    name: string
    icon: string
    gasToken: string
  }
}

export const chainUiKit: ChainDetails = {
  ethereum: {
    name: 'Ethereum',
    icon: ethereumIcon,
    gasToken: 'ETH',
  },
  polygon: {
    name: 'Polygon',
    icon: polygonIcon,
    gasToken: 'MATIC',
  },
  polygonZKEVM: {
    name: 'Polygon zkEVM',
    icon: polygonZkEvmIcon,
    gasToken: 'ETH',
  },
  avalanche: {
    name: 'Avalanche',
    icon: avalancheIcon,
    gasToken: 'AVAX',
  },
  arbitrumOne: {
    name: 'Arbitrum One',
    icon: arbitrumIcon,
    gasToken: 'ETH',
  },
  solana: {
    name: 'Solana',
    icon: solanaIconBlack,
    gasToken: 'SOL',
  },
  solanaCompressed: {
    name: 'Solana (Compressed)',
    icon: solanaIconColor,
    gasToken: 'SOL',
  },
}
