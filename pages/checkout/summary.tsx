import { Typography, Grid, Card, CardContent, Divider, Box, Button, Chip } from '@mui/material';
import { ShopLayout, CartList, OrderSummary } from './../../components';
import NextLink from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/context';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

 const SummaryPage = () => {

  const router = useRouter();
  const { shippingAddress, numberOfItem, onCreateOrder } = useContext( CartContext );
  const [ isDisabledBtn, setIsDisabledBtn] = useState(false);
  const [ errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if( !Cookies.get('firstName') ) {
      router.replace('/checkout/address');
    }
  }, [ router ]);


  const createOrder = async () => {
    setIsDisabledBtn( true );
    const { hasErr, message } = await onCreateOrder();

    if(  hasErr  ) {
      setErrMessage( message );
      setTimeout(() => {
        setIsDisabledBtn( false );
        setErrMessage('');
      } , 5000);
      return;
    }

    router.replace(`/orders/${ message }`)
  }
  

  if( !shippingAddress ) {
    return <></>
  }

  return (
    <ShopLayout title={`Order summary`} pageDescription={'Order summary'} >
        <Typography variant="h1" component={'h1'}> Order summary </Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList edit={ false } />
            </Grid>
            <Grid item  xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant="h2" component={'h2'}> Summary ( { `${ numberOfItem > 1 ? `${ numberOfItem } - Products` : `${ numberOfItem } - Product` }` } ) </Typography>
                        <Divider sx={{ my: 1 }} />

                        <Box display={'flex'} justifyContent='space-between'>
                          <Typography variant="subtitle1" > Address </Typography>
                          <NextLink href={'/checkout/address'} passHref>
                            <Typography variant='h6' >Edit</Typography>

                          </NextLink>
                          
                        </Box>

                        
                        <Typography  > { shippingAddress.firstName } { shippingAddress.lastName } </Typography>
                        <Typography  > { shippingAddress.zip } </Typography>
                        <Typography  > { shippingAddress.address } </Typography>
                        <Typography  > { shippingAddress.country } </Typography>

                        <Divider sx={{ my: 1 }} />

                        <Box display={'flex'} justifyContent='end'>
                          <NextLink href={'/cart'} passHref>
                            <Typography variant='h6' >Edit</Typography>

                          </NextLink>
                        </Box>
                        
                        <OrderSummary />

                        <Box sx={{ mt: 3 }} display={'flex'} flexDirection={'column'}>
                            <Button 
                              disabled={ isDisabledBtn }
                              onClick={ createOrder }
                              color='secondary' fullWidth className='circular-btn'>
                                Confirm Order
                            </Button>
                            <Chip
                              color='error'
                              label={ errMessage }
                              sx={{ display: errMessage ? 'flex' : 'none', mt: 2}}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SummaryPage;