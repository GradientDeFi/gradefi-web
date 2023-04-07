import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import TokenListPageMain from '@/pages/TokenList/Main'

function TokenListPageOutlet() {
  return (
    <>
      <Helmet>
        <title>Token List</title>
      </Helmet>
      <Outlet />
    </>
  )
}

export default function TokenListPage() {
  // /tokenlist
  return (
    <Routes>
      <Route path="/" element={<TokenListPageOutlet />}>
        <Route index path="/" element={<TokenListPageMain />} />
      </Route>
    </Routes>
  )
}
