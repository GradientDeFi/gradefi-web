import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import NftMintCostDataCard from './Card'
import { StyledTableCell } from './Styled'
import { AllChainNftMintCost, NftMintAmount } from '@/constants'
import { AllChainSingularNftTypeMintCost } from '@/interfaces/nft'

export interface NftMintCostDataCardGridProps {
  nftMintCost: AllChainNftMintCost
  mintAmount: NftMintAmount
  nftType: NftTypes
}

export default function NftMintCostDataCardGrid({ nftMintCost, mintAmount, nftType }: NftMintCostDataCardGridProps) {
  const [nftMintCostMultiple, setNftMintCostMultiple] = useState<AllChainSingularNftTypeMintCost>([])

  // Make `decimal` a state so that it updates in sync with the `mintAmount` changes.
  // This prevents the decimals changing before the values get updated, which causes flashing of value length change on the UI.
  const [decimal, setDecimal] = useState<number>(2)

  useEffect(() => {
    // console.log(nftCost)
    if (!nftMintCost) return

    const singularNftTypeMintCost: AllChainSingularNftTypeMintCost = nftMintCost.map((nftCostChain) => ({
      chainName: nftCostChain.chainName,
      cost: nftCostChain.costs[nftType],
      costMultiple: nftCostChain.costs[nftType] * mintAmount,
    }))

    setNftMintCostMultiple(singularNftTypeMintCost)
    setDecimal(mintAmount === 10_000 ? 2 : 0)
  }, [mintAmount, nftMintCost, nftType])

  return (
    <Table sx={{ maxWidth: '100%' }}>
      <TableHead>
        <TableRow>
          <StyledTableCell align="left">
            <Typography variant="body1" fontWeight={500}>Chain</Typography>
          </StyledTableCell>
          <StyledTableCell align="left">
            <Typography variant="body1" fontWeight={500}>1 NFT</Typography>
          </StyledTableCell>
          <StyledTableCell align="right">
            <Typography variant="body1" fontWeight={500}>Total Cost</Typography>
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {nftMintCostMultiple.map((nftCostChain) => (
          <NftMintCostDataCard
            key={nftCostChain.chainName}
            chainName={nftCostChain.chainName}
            cost={nftCostChain.cost}
            costMultiple={nftCostChain.costMultiple}
            decimal={decimal}
          />
        ))}
      </TableBody>
    </Table>
  )
}
