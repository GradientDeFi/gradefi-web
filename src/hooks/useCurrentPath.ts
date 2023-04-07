import { useMemo } from 'react'
import { matchRoutes, useLocation } from 'react-router-dom'

import routes from '../routes'

// https://reactrouter.com/docs/en/v6/utils/match-routes
export default function useCurrentPath(): string {
  const location = useLocation()
  return useMemo(() => {
    const match = matchRoutes(routes, location)

    if (!match) return ''
    const [{ route }] = match // use the first match as the return value
    return route.path as string
  }, [location])
}
