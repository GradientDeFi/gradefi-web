import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

import '@/styles/index.css'

import App from '@/pages/App'
import theme from '@/theme'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
