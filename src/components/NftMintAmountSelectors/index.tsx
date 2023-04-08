import React from 'react'
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material'

import { NftMintAmount } from '@/constants'
import { numberFormatter } from '@/utils/number'

interface NftMintAmountSelectorProps {
  nftMintAmount: NftMintAmount
  fixMintAmount: NftMintAmount
  setNftMintAmount: React.Dispatch<React.SetStateAction<NftMintAmount>>
}

interface NftMintAmountSelectorsProps {
  nftMintAmount: NftMintAmount
  setNftMintAmount: React.Dispatch<React.SetStateAction<NftMintAmount>>
}

function NftMintAmountSelector({ nftMintAmount, fixMintAmount, setNftMintAmount }: NftMintAmountSelectorProps) {
  const active = nftMintAmount === fixMintAmount
  return (
    <Button
      variant={active ? 'contained' : 'outlined'}
      size="medium"
      onClick={() => setNftMintAmount(fixMintAmount)}
    >
      {numberFormatter(fixMintAmount)}
    </Button>
  )
}

export default function NftMintAmountSelectors({ nftMintAmount, setNftMintAmount }: NftMintAmountSelectorsProps) {
  return (
    <Box>
      <Typography variant="subtitle1" textAlign="center" mt={1} className="text-gray-500">
        How much does it cost to mint
        {' '}
        {numberFormatter(nftMintAmount)}
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
