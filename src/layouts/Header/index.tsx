import {
  AppBar, Box, Container, List, ListItem, ListItemButton, ListItemText, Stack, Toolbar,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

import nablaLogo from '@/assets/logo/gradefi/nabla.png'

export default function Header() {
  return (
    <Container disableGutters>
      {
        // <Stack
        //   direction="row"
        //   justifyContent="space-between"
        //   alignItems="center"
        //   spacing={0}
        // >
        //   <Box>
        //     <Link to="/">
        //       <Stack
        //         direction="row"
        //         justifyContent="center"
        //         alignItems="center"
        //         spacing={1}
        //       >
        //         <Box>
        //           <img src={nablaLogo} alt="GraDeFi" className="h-full w-full max-h-20" />
        //         </Box>
        //       </Stack>
        //     </Link>
        //   </Box>
        //   <Box className="text-white">
        //     <List className="flex flex-row">
        //       <ListItem disablePadding>
        //         <ListItemButton href="/">
        //           <ListItemText primary="Home" />
        //         </ListItemButton>
        //       </ListItem>
        //       <ListItem disablePadding>
        //         <ListItemButton href="/tokenlist">
        //           <ListItemText primary="Tokens" />
        //         </ListItemButton>
        //       </ListItem>
        //     </List>
        //   </Box>
        // </Stack>
      }
    </Container>
  )
}
