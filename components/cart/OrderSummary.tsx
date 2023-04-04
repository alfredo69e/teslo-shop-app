import { currency } from '@/utils';
import { CartContext } from './../../context';
import { Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';

export const OrderSummary = () => {

  const { numberOfItem, subTotal, total, tax } = useContext( CartContext )

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
