import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
} from '@mui/material'
import React from 'react'

const navHrefs: { [key: string]: string } = {
  Github: 'https://github.com/GradientDeFi',
  // Docs: '/',
  // Twitter: '/',
  '🫡 Jongwon Park': 'https://parkjongwon.com',
}

const navItems = Object.keys(navHrefs) as Array<keyof typeof navHrefs>

function FooterNavbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent' }}>
      <Container>
        <Toolbar
          disableGutters
          sx={{ width: '100%', justifyContent: 'space-between' }}
        >
          <Box sx={{ color: '#fff', display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              fontWeight="bold"
            >
              &#8711; GraDeFi
            </Typography>
          </Box>
          <Box sx={{ display: { sm: 'block' } }}>
            {navItems.map((item) => (
              <a key={item} style={{ color: '#fff', margin: '0 6px' }} href={navHrefs[item]} target="_blank" rel="noreferrer">
                {item}
              </a>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default function Footer() {
  return (
    <Container
      maxWidth={false}
      className="bg-black"
    >
      <FooterNavbar />
    </Container>
  )
}
