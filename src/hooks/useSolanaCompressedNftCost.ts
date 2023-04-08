//
// Modified version of https://github.com/nickfrosty/compressed.app/blob/main/src/pages/index.tsx
//
// Credit to: Nick Frost
//

import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js'
import {
  ALL_DEPTH_SIZE_PAIRS,
  getConcurrentMerkleTreeAccountSize,
  ValidDepthSizePair,
} from '@solana/spl-account-compression'
import { useEffect, useMemo, useState } from 'react'

import { NftMintAmount, solanaBaseTxCost } from '@/constants'

// make a simple, deduplicated list of the allowed depths
const allDepthSizes = ALL_DEPTH_SIZE_PAIRS.flatMap(
  (pair) => pair.maxDepth,
).filter((item, pos, self) => self.indexOf(item) === pos)

// extract the largest depth that is allowed
const largestDepth = allDepthSizes[allDepthSizes.length - 1]

// define the default depth pair
const defaultDepthPair: ValidDepthSizePair = {
  maxDepth: 3,
  maxBufferSize: 8,
}

function closestTreeData(
  treeNodes: NftMintAmount,
  depthPair: ValidDepthSizePair,
): { maxDepth: number; maxBufferSize: number; canopyDepth: number } {
  let { maxDepth } = depthPair
  const nodes = parseInt(treeNodes.toString())
  if (!treeNodes || nodes <= 0) return { maxDepth, maxBufferSize: 0, canopyDepth: 0 }

  /**
   * The only valid depthSizePairs are stored in the on-chain program and SDK
   */
  for (let i = 0; i <= allDepthSizes.length; i++) {
    if (2 ** allDepthSizes[i] >= nodes) {
      maxDepth = allDepthSizes[i]
      break
    }
  }

  // get the maxBufferSize for the closest maxDepth (reversing it to get the largest buffer by default)
  const maxBufferSize = ALL_DEPTH_SIZE_PAIRS
    .filter((pair) => pair.maxDepth === maxDepth)?.[0]
    ?.maxBufferSize ?? defaultDepthPair.maxBufferSize

  // canopy depth must not be above 17 or else doesn't work
  const maxCanopyDepth = maxDepth >= 20 ? 17 : maxDepth
  const canopyDepth = maxCanopyDepth - 3 >= 0 ? maxCanopyDepth - 3 : 0

  // finally return the computed closest maxDepth
  return { maxDepth, maxBufferSize, canopyDepth }
}

async function getCostForAllTrees(
  connection: Connection,
  nftMintAmount: NftMintAmount,
  depthPair: ValidDepthSizePair,
) {
  const treeData = closestTreeData(nftMintAmount, depthPair)
  // console.log(nftMintAmount, treeData)
  const requiredSpace = getConcurrentMerkleTreeAccountSize(
    treeData.maxDepth,
    treeData.maxBufferSize,
    treeData.canopyDepth,
  )
  let cost = await connection.getMinimumBalanceForRentExemption(requiredSpace)
  cost /= LAMPORTS_PER_SOL // div by lamport exponentiation
  cost /= nftMintAmount // div by number of nodes to get cost per node (NFT)
  cost += solanaBaseTxCost
  return cost
}

export default function useSolanaCompressedNftCost(nftMintAmount: NftMintAmount): number {
  const [cost, setCost] = useState<number>(0)
  const connection = useMemo(() => new Connection(clusterApiUrl('devnet')), [])

  useEffect(() => {
    if (!connection) return
    getCostForAllTrees(connection, nftMintAmount, defaultDepthPair).then(setCost)
  }, [connection, nftMintAmount])

  return cost
}
