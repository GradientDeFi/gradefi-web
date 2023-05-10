import React from 'react'
import {
  Box,
  Button,
  Stack,
  SxProps,
  Typography,
} from '@mui/material'

import { NftMintAmount } from '@/constants'
import { formatNumber } from '@/utils/number'

interface NftMintAmountSelectorProps {
  nftMintAmount: NftMintAmount
  fixMintAmount: NftMintAmount
  setNftMintAmount: React.Dispatch<React.SetStateAction<NftMintAmount>>
}

interface NftMintAmountSelectorsProps {
  nftMintAmount: NftMintAmount
  setNftMintAmount: React.Dispatch<React.SetStateAction<NftMintAmount>>
  sx?: SxProps
}

function NftMintAmountSelector({ nftMintAmount, fixMintAmount, setNftMintAmount }: NftMintAmountSelectorProps) {
  const active = nftMintAmount === fixMintAmount
  return (
    <Button
      variant={active ? 'contained' : 'outlined'}
      size="medium"
      onClick={() => setNftMintAmount(fixMintAmount)}
    >
      {formatNumber(fixMintAmount)}
    </Button>
  )
}

export default function NftMintAmountSelectors({ nftMintAmount, setNftMintAmount, sx }: NftMintAmountSelectorsProps) {
  return (
    <Box sx={sx}>
      <Typography variant="subtitle1" textAlign="center" mt={1} className="text-gray-500">
        How much does it cost to mint
        {' '}
        {formatNumber(nftMintAmount)}
        {' '}
        NFTs on different blockchains?
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        pt={1}
      >
        <NftMintAmountSelector
          nftMintAmount={nftMintAmount}
          fixMintAmount={10_000}
          setNftMintAmount={setNftMintAmount}
        />
        <NftMintAmountSelector
          nftMintAmount={nftMintAmount}
          fixMintAmount={1_000_000}
          setNftMintAmount={setNftMintAmount}
        />
      </Stack>
    </Box>
  )
}
