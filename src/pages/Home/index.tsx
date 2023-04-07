import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import {
  FactCheckOutlined,
  AttachMoney,
  SvgIconComponent,
} from '@mui/icons-material'
import React from 'react'

import nablaLogo from '@/assets/logo/gradefi/nabla.png'
import homeBgImage from '@/assets/images/home-bg.jpg'

function PageLinkedButton({ icon: Icon, name, href }: { icon: SvgIconComponent, name: string, href: string }) {
  return (
    <Button href={href}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        pr={1}
        className="text-blue-600"
      >
        <Icon fontSize="medium" />
        <Typography
          variant="h6"
          fontWeight={600}
          lineHeight={1.25}
          sx={{ textTransform: 'none' }}
        >
          {name}
        </Typography>
      </Stack>
    </Button>
  )
}

export default function HomePageMain() {
  return (
    <Box
      height="100vh"
      width="100%"
      maxWidth="100vw"
      padding={0}
      margin={0}
      sx={{
        backgroundImage: `url(${homeBgImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container
        sx={{
          height: '100%',
          overflowX: 'hidden',
        }}
        disableGutters
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="center"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={{ xs: 4, md: 7 }}
          width="100%"
          mt={{ xs: 10, md: 30 }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 4, md: 6 }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <img src={nablaLogo} alt="GraDeFi" className="h-full w-full max-h-20" />
              <Typography variant="h1" fontWeight={700}>GraDeFi</Typography>
            </Stack>
            <Box>
              <Typography variant="h4" fontWeight={500} lineHeight={1.4}>
                Advancing the State of
                <b> DeFi</b>
              </Typography>
              <Typography variant="body1" fontWeight={300} className="text-gray-500">
                Towards the
                <i> Global Minimum </i>
                of the Gradient.
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={{ xs: 4, md: 6 }}
          >
            <Box>
              {/* <PageLinkedButton name="Token List" href="/tokenlist" icon={FactCheckOutlined} /> */}
              <PageLinkedButton name="NFT Mint Cost" href="/nftcost" icon={AttachMoney} />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
