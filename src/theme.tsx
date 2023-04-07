import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { LinkProps } from '@mui/material/Link'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import type { LinkProps as RouterLinkProps } from 'react-router-dom'

const LinkBehavior = React.forwardRef<
HTMLAnchorElement,
Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props
  // Map href (MUI) -> to (react-router)
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />
})

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '14px',
          backgroundColor: 'rgba(30,30,30,0.8)',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#000',
    },
    background: {
      default: '#f8f8fa',
      paper: '#f1f1f7',
      // dark: '',
    },
  },
})

export default responsiveFontSizes(theme)
