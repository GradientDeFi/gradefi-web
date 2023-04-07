import { Replay } from '@mui/icons-material'
import {
  Box, Container, Typography,
} from '@mui/material'
import React, { ReactNode } from 'react'
import { ErrorBoundary as ErrorBoundaryImport } from 'react-error-boundary'

import nablaLogo from '@/assets/logo/gradefi/nabla.png'
import { CTAButton } from '@/components/Button'

function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: any }) {
  console.log(error.message)
  // ReactGA.exception({
  //   ...error,
  //   ...errorInfo,
  //   fatal: true,
  // })

  return (
    <Container sx={{ height: '100vh' }}>
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
        <Box paddingY={4}>
          <Typography variant="h4" fontWeight={700}>Something went wrong</Typography>
        </Box>
        <Box>
          <CTAButton
            variant="contained"
            size="large"
            endIcon={<Replay />}
            onClick={resetErrorBoundary}
          >
            Try again
          </CTAButton>
        </Box>
      </Box>
    </Container>
  )
}

function ErrorReset() {
  // TODO: reset the state of app so the error doesn't happen again
}

// eslint-disable-next-line react/prop-types
export default function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundaryImport
      FallbackComponent={ErrorFallback}
      onReset={() => ErrorReset()}
    >
      {children}
    </ErrorBoundaryImport>
  )
}
