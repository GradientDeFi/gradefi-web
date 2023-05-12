import React from 'react'
import {
  Box,
  Button,
  Stack,
  SxProps,
} from '@mui/material'

interface NftMintGasPriceNormalizeSelectorsProps {
  isPriceNormalized: boolean
  setIsPriceNormalized: React.Dispatch<React.SetStateAction<boolean>>
  sx?: SxProps
}

export default function NftMintGasPriceNormalizeSelectors({ isPriceNormalized, setIsPriceNormalized, sx }: NftMintGasPriceNormalizeSelectorsProps) {
  return (
    <Box sx={sx}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        pt={1}
      >
        <Button
          variant={!isPriceNormalized ? 'contained' : 'outlined'}
          size="medium"
          onClick={() => setIsPriceNormalized(false)}
        >
          Current Price
        </Button>
        <Button
          variant={isPriceNormalized ? 'contained' : 'outlined'}
          size="medium"
          onClick={() => setIsPriceNormalized(true)}
        >
          Normalized Price
        </Button>
      </Stack>
    </Box>
  )
}
