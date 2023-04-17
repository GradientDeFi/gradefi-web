import { useMemo } from 'react'
import { ethers } from 'ethers'

import { EvmChainName } from '@/constants'

export default function useEvmProviders(): { [name in EvmChainName]: ethers.providers.Provider } {
  return useMemo(
    (): { [name in EvmChainName]: ethers.providers.Provider } => ({
      ethereum: new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth'),
      polygon: new ethers.providers.JsonRpcProvider('https://polygon-rpc.com'),
      polygonZKEVM: new ethers.providers.JsonRpcProvider('https://zkevm-rpc.com'),
      avalanche: new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc'),
      arbitrumOne: new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc'),
      optimism: new ethers.providers.JsonRpcProvider('https://mainnet.optimism.io'),
      // zkSyncEra: new ethers.providers.JsonRpcProvider('https://mainnet.era.zksync.io'),
    }),
    [],
  )
}
