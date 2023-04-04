import React, { useContext, useState } from 'react';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography, Input, InputAdornment } from '@mui/material';
import NextLink from 'next/link';
import { ClearOutlined, SearchOutlined, ShoppingBagOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { CartContext, UIContext } from '../../../context';

export const NavBar = () => {

   const { numberOfItem } = useContext( CartContext )

    const { push, asPath } = useRouter();

    const [searchTerm, setSearchTerm] = useState('');
    const [isSerachVisibled, setIsSerachVisibled] = useState(false);

    const { toggleSideMenu } = useContext( UIContext );

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push( `/search/${searchTerm}` );
    }

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

            <Box 
                className='fadeIn'
                sx={{
                display: isSerachVisibled 
                ? 'none' : {
                    xs: 'none',
                    sm: 'block'
                } }}
            >
                <NextLink href={'/category/men'} legacyBehavior>
                    <Link>
                        <Button color={ asPath === '/category/men' ? 'primary' : 'info' } > Mens </Button>
                    </Link>
                </NextLink>
                <NextLink href={'/category/women'} legacyBehavior>
                    <Link>
                        <Button color={ asPath === '/category/women' ? 'primary' : 'info' }> Womens </Button>
                    </Link>
                </NextLink>
                <NextLink href={'/category/kid'} legacyBehavior>
                    <Link>
                        <Button color={ asPath === '/category/kid' ? 'primary' : 'info' }> Kids </Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={ 1 }  />

            
            {
               !isSerachVisibled 
               ? <IconButton 
                        sx={{ 
                            display: {
                            xs: 'none', sm: 'block'
                        } }}
                    onClick={ () => setIsSerachVisibled( true ) }
                    >
                        <SearchOutlined />
                    </IconButton>
               :  <Input
                    autoFocus
                    className='animate__animated animate__fadeIn'
                    type='text'
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={ ({ target }) => setSearchTerm( target.value ) }
                    onKeyPress={ ({ key }) => ( key === 'Enter') ? onSearchTerm() : null }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            onClick={ () => setIsSerachVisibled( false ) }
                            >
                                <ClearOutlined />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            }
        
            {/* pantallas mobiles */}
            <IconButton sx={{ display: {
                xs: 'block', sm: 'none'
            } }}
                onClick={ () => toggleSideMenu( true ) }
            >
                <SearchOutlined />
            </IconButton>

            <NextLink href={'/cart'} legacyBehavior>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={ numberOfItem > 9 ? '+9' : numberOfItem } color='secondary'>
                                <ShoppingBagOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
            </NextLink>

            <Button 
            onClick={ () => toggleSideMenu( true ) }
            >
                <Typography> Menu </Typography>
            </Button>
        </Toolbar>
    </AppBar>
  )
}
