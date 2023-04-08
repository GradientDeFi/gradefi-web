import { Stack, SxProps } from '@mui/material'
import React, { useEffect } from 'react'

import NftMintCostDataCard from './Card'
import { AllChainNftMintCost, NftMintAmount } from '@/constants'
import { AllChainSingularNftTypeMintCost } from '@/interfaces/nft'

const nftType: NFTTypes = 'enumerable'

export interface NftMintCostDataCardGridProps {
  nftMintCost: AllChainNftMintCost
  mintAmount: NftMintAmount
  sx?: SxProps
}

export default function NftMintCostDataCardGrid({ nftMintCost, mintAmount, sx }: NftMintCostDataCardGridProps) {
  const [nftMintCostMultiple, setNftMintCostMultiple] = React.useState<AllChainSingularNftTypeMintCost>([])

  useEffect(() => {
    // console.log(nftCost)
    if (!nftMintCost) return

    const singularNftTypeMintCost: AllChainSingularNftTypeMintCost = nftMintCost.map((nftCostChain) => ({
      chainName: nftCostChain.chainName,
      cost: nftCostChain.costs[nftType] * mintAmount,
    }))

    setNftMintCostMultiple(singularNftTypeMintCost)
  }, [mintAmount, nftMintCost])

  // TODO: evaluate using Grid2
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      maxWidth={{ xs: '100%', sm: 330 }}
      m="0 auto"
      sx={sx}
    >
      {nftMintCostMultiple.map((nftCostChain) => (
        <NftMintCostDataCard
          key={nftCostChain.chainName}
          chainName={nftCostChain.chainName}
          cost={nftCostChain.cost}
          decimal={mintAmount === 10_000 ? 2 : 0}
        />
      ))}
    </Stack>
  )
}
