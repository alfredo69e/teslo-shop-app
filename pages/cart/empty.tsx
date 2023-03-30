

import { RemoveShoppingCart } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { ShopLayout } from './../../components';
import NextLink from 'next/link';

 const emptyPage = () => {
  return (
    <ShopLayout title={'Cart Empty'} pageDescription={'No Hay articulos en el carrito de compras'} >
        <Box display={'flex'} justifyContent='center' alignItems={'center'} height={'calc( 100vh - 200px )'}>
            <RemoveShoppingCart sx={{ fontSize: 100 }} />
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Typography > Su Carrito esta Vacio </Typography> 
                <NextLink href={'/'} passHref style={{ textDecoration: 'none' }}>
                    <Typography variant='h4' color={'secondary'}> Back </Typography> 
                </NextLink>   
            </Box>
        </Box>
    </ShopLayout>
  )
}



export default emptyPage;