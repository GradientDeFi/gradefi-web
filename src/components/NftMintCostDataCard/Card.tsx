//
// Modified from https://github.com/nickfrosty/compressed.app/blob/main/src/components/DataCard.tsx
//
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

import { AllChainName, chainUiKit } from '@/constants'
import { numberFormatter } from '@/utils/number'

export interface DataCardProps {
  chainName: AllChainName
  cost: number
}

export default function DataCard(props: DataCardProps) {
  return (
    <Box
      bgcolor="white"
      p={2.5}
      className="border border-gray-300 rounded-lg"
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={3}
      >
        <img src={chainUiKit[props.chainName].icon} alt="" width={40} height={40} />
        <Box>
          <Typography variant="body2" fontWeight={500} className="text-gray-600">
            {chainUiKit[props.chainName].name}
          </Typography>
          <Typography variant="h5" fontWeight={600} lineHeight={1.3}>
            {`${props.cost ? `~${numberFormatter(props.cost)}` : '---'} USD`}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}
