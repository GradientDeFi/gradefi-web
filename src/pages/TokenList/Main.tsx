import {
  Box, Button, Container, Divider, List, ListItemButton, Stack, Typography,
} from '@mui/material'
import styled from '@mui/material/styles/styled'
import React, { useEffect } from 'react'

import tokenList from '@/data/token-list.json'
import { TokenList, TokenListKeys } from '@/types/common'

const BorderedBox = styled(Box)(({ theme }) => ({
  border: '1px solid #ddd',
  borderRadius: 6,
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 20,
  paddingRight: 20,
}))

function TokenListDisplay({ token }: { token: TokenListKeys | '' }) {
  if (token === '') return (<></>)
  const tlist = tokenList[token] as TokenList
  return (
    <>
      <Box paddingBottom={2}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <img src={tlist.logo} alt="GraDeFi" className="h-full w-auto max-h-12" />
          <Typography variant="h6" fontWeight={700}>{tlist.name}</Typography>
        </Stack>
      </Box>
      {
        // eslint-disable-next-line
        Object.keys(tlist.tokens).map((variation) => (
          <>
            <Divider />
            <Box key={variation} paddingY={2}>
              <Typography variant="h6" fontWeight={500} lineHeight={1.2} textTransform="capitalize">{variation}</Typography>
              <List>
                {
                  // @ts-expect-error different types, to be fixed (TODO)
                  // eslint-disable-next-line
                  Object.keys(tlist.tokens[variation]).map((chain: keyof typeof tokenList._chains) => (
                    <ListItemButton key={`${variation}_${chain}`}>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Box width={100} overflow="hidden" textOverflow="ellipsis">
                          <Typography variant="body1">{tokenList._chains[chain]}</Typography>
                        </Box>
                        <Typography variant="body1">
                          {tlist.tokens[variation][chain] === '0x' ? 'N/A' : tlist.tokens[variation][chain]}
                        </Typography>
                      </Stack>
                    </ListItemButton>
                  ))
                }
              </List>
            </Box>
          </>
        ))
      }
    </>
  )
}

export default function TokenListPageMain() {
  const [token, setToken] = React.useState<TokenListKeys | ''>('')

  useEffect(() => setToken('BTC'), [])

  return (
    <Box
      minHeight="100vh"
      minWidth="100vw"
    >
      <Container
        sx={{
          paddingY: { xs: 4, md: 6 },
        }}
      >
        <BorderedBox>
          <Typography variant="h6" fontWeight={700}>Select Token</Typography>
        </BorderedBox>
        <BorderedBox marginTop={4}>
          <TokenListDisplay token={token} />
        </BorderedBox>
      </Container>
    </Box>
  )
}
