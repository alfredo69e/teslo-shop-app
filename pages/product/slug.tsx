import { initialData } from '@/db/products';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import React from 'react';
import { ItemCounter, ProductSlideshow, ShopLayout, SizeSelector } from './../../components';

const product = initialData.products[0];

 const ProductPage = () => {
  return (
    <ShopLayout title={ product.title } pageDescription={ product.description }>
      <Grid container spacing={ 3 } >
        <Grid item xs={ 12 } sm={ 7 } >
          <ProductSlideshow slideImages={ product.images } />
        </Grid>
        <Grid item xs={ 12 } sm={ 5 }>
          <Box display={'flex'} flexDirection={'column'}>
            
            {/* Titulos */}
            <Typography variant='h1' component={'h1'} > { product.title } </Typography>
            <Typography variant='h2' component={'h2'} > { `$${ product.price }` } </Typography>
            {/* Cantidad */}
            <Box sx={{ my: 2 }} >
              <Typography variant='subtitle2' >  Cantidad </Typography>
              <ItemCounter />
              <SizeSelector selectSize={ product.sizes[0] } sizes={ product.sizes } />
            </Box>

            {/* Add To Cart */}

            <Button color={'secondary'} className={'circular-btn'}>
                  Add To Cart
            </Button>

            {/* <Chip label={'No Hay Disponible'} color={'error'} variant='outlined' /> */}

            {/* Description */}
            <Box sx={{ mt: 3 }} >
              <Typography variant='subtitle2'  > Description </Typography>
              <Typography variant='body2' > { product.description } </Typography>

            </Box>
            
          </Box>

        </Grid>
        
      </Grid>
    </ShopLayout>
  )
}


export default ProductPage;