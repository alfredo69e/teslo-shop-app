import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { IProduct } from './../../../interfaces';
import { ProductCart } from '../cart';

interface Props {
  products: IProduct[]
}

export const ProductList: FC< Props > = ({ products }) => {
  return (
    <Grid container spacing={ 4 } >
      {
        products.map(( product ) => (
          <ProductCart key={ product._id || product.slug } product={ product } />
        ))
      }
    </Grid>
  )
}
