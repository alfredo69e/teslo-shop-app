import React, { useContext, useEffect } from 'react';
import { CartList, OrderSummary, ShopLayout } from './../../components';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartContext } from './../../context';
import { useRouter } from 'next/router';

 const CartPage = () => {

    const { isLoaded, cart, numberOfItem } = useContext( CartContext );

    const router = useRouter();

    useEffect(() => {
      if( isLoaded && cart.length === 0 ) {
        router.replace('/cart/empty')
      }
    }, [ isLoaded, cart, router ]);
    
    if( !isLoaded || cart.length === 0) {
        return <></>
    }

  return (
    <ShopLayout title={`Cart - ${numberOfItem}`} pageDescription={'Cart Teslo - Shop'} >
        <Typography variant="h1" component={'h1'}> Cart </Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList edit />
            </Grid>
            <Grid item  xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant="h2" component={'h2'}> Order </Typography>
                        <Divider sx={{ my: 1 }} />
                        
                        <OrderSummary />

                        <Box sx={{ mt: 3 }}>
                            <Button href={`/checkout/address`} color='secondary' fullWidth className='circular-btn'>
                                Checkout
                            </Button>

                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}


export default CartPage;