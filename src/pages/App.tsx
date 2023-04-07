import { Box } from '@mui/material'
import React, { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'

import ErrorBoundary from '@/components/ErrorBoundary'
import DynamicHeader from '@/layouts/Header'
import Footer from '@/layouts/Footer'
// Outlet pages
import HomePage from '@/pages/Home'
import PageNotFoundPage from '@/pages/PageNotFound'
import TokenListPage from '@/pages/TokenList'
import NftMintCostPage from '@/pages/NftMintCost'

function AppWrapper({ children }: { children: ReactNode }) {
  return <Box maxWidth="100vw" sx={{ overflowX: 'hidden' }}>{children}</Box>
}

function App() {
  return (
    <ErrorBoundary>
      <AppWrapper>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="description" content="GraDeFi" />
          {/* &#8711; is nabla */}
          <title>GraDeFi</title>
          <link rel="canonical" href="https://gradefi.com" />
        </Helmet>
        <DynamicHeader />
        <div className="mb-auto">
          <Routes>
            <Route path="*" element={<PageNotFoundPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/tokenlist/*" element={<TokenListPage />} />
            <Route path="/nftcost/*" element={<NftMintCostPage />} />
          </Routes>
        </div>
        <Footer />
      </AppWrapper>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </ErrorBoundary>
  )
}

export default App
