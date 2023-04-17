///
/// Some chains have different gas-fee calculation methods, especially for L2s.
///

import {
  BigNumber,
  Contract,
  providers,
  utils,
} from 'ethers'

import { evmChainNames } from '@/constants/chains'
import { fnSelectorMint } from '@/constants/nft'
import nftGasCost from '@/data/nft-gas-cost'

async function evmDefaultBaseGasCalculator(provider: providers.Provider): Promise<number> {
  return (await provider.getGasPrice()).toNumber() // gas price in wei (BigNumber) => number in wei
}

export interface EvmChainBaseGasCalculator {
  [chain: typeof evmChainNames[number]]: (provider: providers.Provider) => Promise<number>
}

const evmChainBaseGasDefaultSpread: EvmChainBaseGasCalculator = evmChainNames.reduce((a, v) => ({ ...a, [v]: evmDefaultBaseGasCalculator }), {})

const optimismGasPriceOracleAddress = '0x420000000000000000000000000000000000000f'
const optimismGasPriceOracleAbi = [{
  inputs: [{ internalType: 'bytes', name: '_data', type: 'bytes' }], name: 'getL1Fee', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function',
}]

export const evmChainBaseGas: EvmChainBaseGasCalculator = {
  // by default, uses the default gas calculator
  ...evmChainBaseGasDefaultSpread,
  // override below to use a custom function
  optimism: async (provider: providers.Provider): Promise<number> => {
    // https://help.optimism.io/hc/en-us/articles/4411895794715-How-do-transaction-fees-on-Optimism-work
    // Optimism tx gas = L1 security fee + L2 execution fee, where
    // L1 security fee = L1 base gas price * L1 gas used (calculated with tx data via OVM_GasPriceOracle)
    // L2 execution fee = L2 base gas price * L2 gas used (base gas returned by .getGasPrice())

    // Implementation of @eth-optimism/sdk `estimateL1GasCost` function
    // https://github.com/ethereum-optimism/optimism/blob/e6f1f61c569dbabffa2cfe6129e8e23a8646ffca/packages/sdk/src/l2-provider.ts#L92

    // L2 execution gas used is constant, defined in `data/nft-gas-cost.ts`
    const l2ExecutionGasPrice = (await provider.getGasPrice()).toNumber()

    // Fake tx to mimic tx data of minting barebone ERC-721 on Optimism
    const serializedTxData = utils.serializeTransaction({
      data: fnSelectorMint,
      to: '0x7f5c764cbc14f9669b88837ca1490cca17c31607', // random address, irrelevant
      gasPrice: l2ExecutionGasPrice,
      maxFeePerGas: l2ExecutionGasPrice,
      type: 2, // EIP-1559 (gasPrice == maxFeePerGas)
      gasLimit: nftGasCost.evm.enumerable, // gas used for minting enumerable ERC-721
      nonce: 1, // some random number
    })

    const gasPriceOracle = new Contract(optimismGasPriceOracleAddress, optimismGasPriceOracleAbi, provider)
    const l1ExecutionCost = (await (gasPriceOracle.getL1Fee(serializedTxData) as Promise<BigNumber>)).toNumber()

    // TODO: Calculation for other types of ERC-721 (currently only barebone ERC-721)
    // NOTE: We divide l1ExecutionCost by enumerable ERC-721 gas cost as a temporary workaround
    //       to figure out the total gas cost for minting ERC-721 on Optimism. This doesn't work for
    //       NFTs other than enumerable ERC-721 because the division denominator is different.
    //       But we use this temp fix for the time being, because L1ExecutionCost depends on the
    //       serialized tx input content and length, we only calculate for enumerable ERC-721 for now.
    const totalTxCost = l1ExecutionCost / nftGasCost.evm.enumerable + l2ExecutionGasPrice

    // NOTE: Later in the logic, we multiply `totalTxCost` by nftGasCost.evm.enumerable (only supported for
    //        now) to get the mint gas cost for enumerable ERC-721. Thus, the final calculation becomes:
    //       mintGasCost = l1ExecutionCost + l2ExecutionGasPrice * nftGasCost.evm.enumerable (for enumerable ERC-721)
    return totalTxCost
  },
}
