import { Stack } from '@mui/material'
import React, { useEffect } from 'react'

import NftMintCostDataCard from './Card'
import { AllChainNftMintCost } from '@/constants'
import { NftMintCost10k } from '@/interfaces/nft'

const nftType: NFTTypes = 'enumerable'

export interface NftMintCostDataCardGridProps {
  nftMintCost: AllChainNftMintCost
}

export default function NftMintCostDataCardGrid({ nftMintCost }: NftMintCostDataCardGridProps) {
  const [nftMintCost10k, setNftMintCost10k] = React.useState<NftMintCost10k>({})

  useEffect(() => {
    // console.log(nftCost)
    if (!nftMintCost) return

    Object.keys(nftMintCost).forEach((chainName) => {
      if (!(nftType in nftMintCost[chainName])) return
      setNftMintCost10k((prev) => ({
        ...prev,
        [chainName]: nftMintCost[chainName][nftType] * 10000,
      }))
    })
  }, [nftMintCost])

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      maxWidth={{ xs: '100%', sm: 330 }}
      m="0 auto"
    >
      {Object.keys(nftMintCost10k).map((chainName) => (
        <NftMintCostDataCard key={chainName} chainName={chainName} cost={nftMintCost10k[chainName]} />
      ))}
    </Stack>
  )
}
