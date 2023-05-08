import WormholeBridge from '@wormhole-foundation/wormhole-connect'
import React from 'react'

export default function ExperimentsPageMain() {
  return (
    <WormholeBridge
      config={{
        env: 'mainnet',
        // tokens: ['USDCpolygon', 'USDCavax'],
      }}
    />
  )
}
