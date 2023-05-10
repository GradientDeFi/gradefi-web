//
// Modified from https://github.com/nickfrosty/compressed.app/blob/main/src/components/DataCard.tsx
//
import { Stack, Typography } from '@mui/material'
import React from 'react'

import { StyledTableCell, StyledTableRow } from './Styled'
import { AllChainName, chainUiKit } from '@/constants'
import { numberFormatter, numberFormatterSig } from '@/utils/number'

export interface NftMintDataCardProps {
  chainName: AllChainName
  cost: number
  costMultiple: number
  decimal: number
}

export default function NftMintDataCard(props: NftMintDataCardProps) {
  const chainUiInfo = chainUiKit[props.chainName]
  return (
    <StyledTableRow key={chainUiInfo.name}>
      <StyledTableCell align="left" component="th" scope="row">
        <Stack
          alignItems={{ xs: 'flex-start', md: 'center' }}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          spacing={{ xs: 1, md: 2 }}
        >
          <img src={chainUiInfo.icon} alt="" width={34} height={34} />
          <Typography variant="body1" fontWeight={500} className="text-gray-600">
            {chainUiInfo.name}
          </Typography>
        </Stack>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography variant="h5" fontWeight={600} lineHeight={1.3}>
          {`${props.cost ? `~$${numberFormatterSig(props.cost, 2)}` : '$--.--'}`}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Typography variant="h5" fontWeight={600} lineHeight={1.3}>
          {`${props.costMultiple ? `$${numberFormatter(props.costMultiple, props.decimal)}` : '$--.--'}`}
        </Typography>
      </StyledTableCell>
    </StyledTableRow>
  )
}
