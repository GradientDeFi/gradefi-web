import { HikingOutlined } from '@mui/icons-material'
import {
  Box, Container, Typography,
} from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
// import { useRouteError } from 'react-router-dom'

import homeBgImage from '@/assets/images/home-bg.jpg'
import nablaLogo from '@/assets/logo/gradefi/nabla.png'
import { CTAButton } from '@/components/Button'

export default function PageNotFound() {
  // const error = useRouteError()
  // console.error(error)
  return (
    <>
      <Helmet>
        <title>Uh oh... GraDeFi</title>
      </Helmet>
      <Container
        disableGutters
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundImage: `url(${homeBgImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Box>
            <img src={nablaLogo} alt="GraDeFi" className="h-full w-full max-h-12" />
          </Box>
          <Box paddingY={8} className="text-center">
            <Typography variant="h5" fontWeight={500}>You are at the</Typography>
            <Typography variant="h3" fontWeight={700} lineHeight={1.2}>Local Minimum!</Typography>
          </Box>
          <Box>
            <CTAButton
              variant="contained"
              size="large"
              startIcon={<HikingOutlined />}
              href="/"
            >
              Global Minimum
            </CTAButton>
          </Box>
        </Box>
      </Container>
    </>
  )
}
