import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import NFTCostPageMain from '@/pages/NftMintCost/Main'

function NFTCostPageOutlet() {
  return (
    <>
      <Helmet>
        <title>NFT Cost</title>
      </Helmet>
      <Outlet />
    </>
  )
}

export default function NFTCostPage() {
  // /tokenlist
  return (
    <Routes>
      <Route path="/" element={<NFTCostPageOutlet />}>
        <Route index path="/" element={<NFTCostPageMain />} />
      </Route>
    </Routes>
  )
}
