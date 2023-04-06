import { currency } from '@/utils';
import { CartContext } from './../../context';
import { Grid, Typography } from '@mui/material';
import React, { FC, useContext } from 'react';

interface Props {
  pay?: {
    numberOfItem: number;
    subTotal: number;
    total: number;
    tax: number;

  }; 
}

export const OrderSummary: FC< Props > = ({ pay }) => {

  let { numberOfItem, subTotal, total, tax } = useContext( CartContext );

  if( pay ) {
    numberOfItem = pay.numberOfItem;
    subTotal = pay.subTotal;
    total = pay.total;
    tax = pay.tax;
  }


  return (
    <Grid container>
      <Grid item xs={ 6 } >
        <Typography > { numberOfItem > 0 ? 'Products' : 'Not Products' }  </Typography>
      </Grid>

      <Grid item xs={ 6 } display='flex' justifyContent={'end'} >
        <Typography > { numberOfItem } </Typography>
      </Grid>

      <Grid item xs={ 6 } >
        <Typography > SubTotal </Typography>
      </Grid>

      <Grid item xs={ 6 } display='flex' justifyContent={'end'} >
        <Typography > {`${ currency.format( subTotal ) }`} </Typography>
      </Grid>

      <Grid item xs={ 6 } >
        <Typography > Tax ({ Number(process.env.NEXT_PUBLIC_TAX_RATE || 0 ) * 100 }%) </Typography>
      </Grid>

      <Grid item xs={ 6 } display='flex' justifyContent={'end'} >
        <Typography > {`${ currency.format( tax ) }`} </Typography>
      </Grid>

      <Grid item xs={ 6 } sx={{ mt: 3 }} >
        <Typography variant='subtitle1' > Total </Typography>
      </Grid>

      <Grid item xs={ 6 } sx={{ mt: 3 }} display='flex' justifyContent={'end'} >
        <Typography variant='subtitle1'> {`${ currency.format( total ) }`} </Typography>
      </Grid>
    </Grid>
  )
}
