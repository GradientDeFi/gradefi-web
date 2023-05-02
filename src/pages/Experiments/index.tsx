import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import ExperimentsPageMain from '@/pages/Experiments/Main'

function ExperimentsPageOutlet() {
  return (
    <>
      <Helmet>
        <title>Experiments</title>
      </Helmet>
      <Outlet />
    </>
  )
}

export default function ExperimentsPage() {
  // /tokenlist
  return (
    <Routes>
      <Route path="/" element={<ExperimentsPageOutlet />}>
        <Route index path="/" element={<ExperimentsPageMain />} />
      </Route>
    </Routes>
  )
}
