import { Grid, Typography } from '@mui/material';
import React from 'react';

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={ 6 } >
        <Typography > Not Products </Typography>
      </Grid>

      <Grid item xs={ 6 } display='flex' justifyContent={'end'} >
        <Typography > 3 </Typography>
      </Grid>

      <Grid item xs={ 6 } >
        <Typography > SubTotal </Typography>
      </Grid>

      <Grid item xs={ 6 } display='flex' justifyContent={'end'} >
        <Typography > {`$${ 155.36 }`} </Typography>
      </Grid>

      <Grid item xs={ 6 } >
        <Typography > Tax (15%) </Typography>
      </Grid>

      <Grid item xs={ 6 } display='flex' justifyContent={'end'} >
        <Typography > {`$${ 35.20 }`} </Typography>
      </Grid>

      <Grid item xs={ 6 } sx={{ mt: 3 }} >
        <Typography variant='subtitle1' > Total </Typography>
      </Grid>

      <Grid item xs={ 6 } sx={{ mt: 3 }} display='flex' justifyContent={'end'} >
        <Typography variant='subtitle1'> {`$${ 167.89 }`} </Typography>
      </Grid>
    </Grid>
  )
}
