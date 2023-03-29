import React from 'react';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import NextLink from 'next/link';
import { SearchOutlined, ShoppingBagOutlined, MenuOutlined } from '@mui/icons-material';

export const NavBar = () => {
  return (
    <AppBar>
        <Toolbar>
            <NextLink href={'/'} passHref legacyBehavior>
                <Link display={'flex'} alignItems='center' >
                    <Typography variant='h6'> Teslo |</Typography>
                    <Typography sx={{ marginLeft: 0.5 }}> Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={ 1 }  />

            <Box sx={{ display: {
                xs: 'none',
                sm: 'block'
            } }}>
                <NextLink href={'/category/mens'} legacyBehavior>
                    <Link>
                        <Button > Mens </Button>
                    </Link>
                </NextLink>
                <NextLink href={'/category/womens'} legacyBehavior>
                    <Link>
                        <Button > Womens </Button>
                    </Link>
                </NextLink>
                <NextLink href={'/category/kids'} legacyBehavior>
                    <Link>
                        <Button > Kids </Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={ 1 }  />

            <IconButton>
                <SearchOutlined />
            </IconButton>

            <NextLink href={'/cart'} legacyBehavior>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={ 2 } color='secondary'>
                                <ShoppingBagOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
            </NextLink>

            <IconButton>
                <Typography> Menu </Typography>
            </IconButton>
        </Toolbar>
    </AppBar>
  )
}
