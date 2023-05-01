import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import NftCostPageMain from '@/pages/NftMintCost/Main'

function NftCostPageOutlet() {
  return (
    <>
      <Helmet>
        <title>NFT Cost</title>
      </Helmet>
      <Outlet />
    </>
  )
}

export default function NftCostPage() {
  // /tokenlist
  return (
    <Routes>
      <Route path="/" element={<NftCostPageOutlet />}>
        <Route index path="/" element={<NftCostPageMain />} />
      </Route>
    </Routes>
  )
}
