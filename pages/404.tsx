
import { Box, Typography } from '@mui/material';
import React from 'react'
import { ShopLayout } from './../components';

 const Custom404Page = () => {
  return (
    <ShopLayout title={'Page not Found'} pageDescription={'No hay nada Aqui'}>
        <Box display={'flex'} justifyContent='center' alignItems={'center'} height={'calc( 100vh - 200px )'}>
           <Typography variant='h1' component={'h1'} sx={{ fontSize: {  xs: 40, sm: 80, md: 100  } }} fontWeight={200}> 404 |</Typography>
           <Typography marginLeft={ 2 } sx={{ fontSize: {  xs: 20, sm: 35, md: 50  } }} > No econtramos nada </Typography>
        </Box>
    </ShopLayout>
  )
}


export default Custom404Page;