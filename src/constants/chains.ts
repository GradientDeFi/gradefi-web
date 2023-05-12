import ethereumIcon from '@/assets/logo/ethereum/ethereum-icon-color.svg'
import polygonIcon from '@/assets/logo/polygon/polygon-icon-color.svg'
import polygonZkEvmIcon from '@/assets/logo/polygon/zkevm-icon-color.png'
import bnbChainIcon from '@/assets/logo/bnbchain/bnbchain-icon-color.svg'
import avalancheIcon from '@/assets/logo/avalanche/avalanche-icon-color.svg'
import arbitrumIcon from '@/assets/logo/arbitrum/arbitrum-icon-color.png'
import optimismIcon from '@/assets/logo/optimism/optimism-icon-color.svg'
import solanaIconBlack from '@/assets/logo/solana/solana-icon-black.svg'
import solanaIconColor from '@/assets/logo/solana/solana-icon-color.svg'
import nearIcon from '@/assets/logo/near/near-icon-black.svg'
import nearAuroraIcon from '@/assets/logo/near-aurora/aurora-icon-color.png'

export const evmChainNames = [
  'ethereum',
  'polygon',
  'polygonZKEVM',
  'bnbChain',
  'avalanche',
  'arbitrumOne',
  'optimism',
  'nearAurora',
  // 'zkSyncEra'
]

export const nonEvmChainNames = ['solana', 'solanaCompressed', 'near']

export const allChainNames = [...evmChainNames, ...nonEvmChainNames]

export type EvmChainName = typeof evmChainNames[number]

export type NonEvmChainName = typeof nonEvmChainNames[number]

export type AllChainName = EvmChainName | NonEvmChainName

export type EVMGasPrice = { [name in EvmChainName]: number }

export type NativeTokenUsdPrice = { [name in AllChainName]: number }

export interface ChainDetails {
  [name: typeof allChainNames[number]]: {
    name: string
    icon: string
    color: string
    gasToken: string
  }
}

export const chainUiKit: ChainDetails = {
  ethereum: {
    name: 'Ethereum',
    icon: ethereumIcon,
    color: '#CDC3F7',
    gasToken: 'ETH',
  },
  polygon: {
    name: 'Polygon',
    icon: polygonIcon,
    color: '#7A4ADD',
    gasToken: 'MATIC',
  },
  polygonZKEVM: {
    name: 'Polygon zkEVM',
    icon: polygonZkEvmIcon,
    color: '#7A4ADD',
    gasToken: 'ETH',
  },
  bnbChain: {
    name: 'BNB Chain',
    icon: bnbChainIcon,
    color: '#F3BA2F',
    gasToken: 'BNB',
  },
  avalanche: {
    name: 'Avalanche',
    icon: avalancheIcon,
    color: '#D64F49',
    gasToken: 'AVAX',
  },
  arbitrumOne: {
    name: 'Arbitrum One',
    icon: arbitrumIcon,
    color: '#4FA0E8',
    gasToken: 'ETH',
  },
  solana: {
    name: 'Solana',
    icon: solanaIconBlack,
    color: '#71ECAD', // #8C4BF5
    gasToken: 'SOL',
  },
  solanaCompressed: {
    name: 'Solana (Compressed)',
    icon: solanaIconColor,
    color: '#71ECAD',
    gasToken: 'SOL',
  },
  optimism: {
    name: 'Optimism',
    icon: optimismIcon,
    color: '#EA3431',
    gasToken: 'ETH',
  },
  nearAurora: {
    name: 'Aurora',
    icon: nearAuroraIcon,
    color: '#5deb5a',
    gasToken: 'ETH',
  },
  near: {
    name: 'Near',
    icon: nearIcon,
    color: '#000000',
    gasToken: 'NEAR',
  },
}
