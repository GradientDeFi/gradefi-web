import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

// styled(MuiButton)(({ pill }) => ({
//   borderRadius: pill ? 50 : 4
// }))

export default styled(Button)(({ theme }) => ({
  position: 'relative',
  // height: 200,
  color: '#fff',
  backgroundColor: '#222',
  borderRadius: 50,
  // [theme.breakpoints.down('sm')]: {
  //   width: '100% !important', // Overrides inline-style
  //   height: 100,
  // },
  '&:hover': {
    backgroundColor: '#333',
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}))
