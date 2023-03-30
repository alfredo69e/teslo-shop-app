import { ShopLayout, CartList, OrderSummary } from './../../components';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Chip } from '@mui/material';
import NextLink from 'next/link';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';


 const OrderPage = () => {
  return (
    <ShopLayout title={`Summary Order 12345`} pageDescription={'Order summary'} >
        <Typography variant="h1" component={'h1'}> Order: 123abc </Typography>
        {/* <Chip 
            sx={{
                my: 2,
                padding: 2
            }} 
            label='Pending Of Pay'
            variant='outlined'
            color='error'
            icon={ <CreditCardOffOutlined /> }
        />  */}

        <Chip 
            sx={{
                my: 2,
                padding: 2
            }} 
            label='Order was paid'
            variant='outlined'
            color='success'
            icon={ <CreditScoreOutlined /> }
        /> 

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList edit={ false } />
            </Grid>
            <Grid item  xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant="h2" component={'h2'}> Summary ( 3 - Products ) </Typography>
                        <Divider sx={{ my: 1 }} />

                        <Box display={'flex'} justifyContent='space-between'>
                        <Typography variant="subtitle1" > Address </Typography>
                        <NextLink href={'/checkout/address'} passHref>
                            <Typography variant='h6' >Edit</Typography>

                        </NextLink>
                        
                        </Box>

                        
                        <Typography  > Alfredo Echeverria </Typography>
                        <Typography  > 3 </Typography>
                        <Typography  > Address </Typography>
                        <Typography  > Panama </Typography>

                        <Divider sx={{ my: 1 }} />

                        <Box display={'flex'} justifyContent='end'>
                        <NextLink href={'/cart'} passHref>
                            <Typography variant='h6' >Edit</Typography>

                        </NextLink>
                        </Box>
                        
                        <OrderSummary />

                        <Box sx={{ mt: 3 }}>
                            {/* TODO: */}
                            <Typography variant='h1' >Pagar</Typography>
                            <Chip 
                                sx={{
                                    my: 2,
                                    padding: 2
                                }} 
                                label='Order was paid'
                                variant='outlined'
                                color='success'
                                icon={ <CreditScoreOutlined /> }
                            /> 

                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage;