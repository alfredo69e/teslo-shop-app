import { Typography, Grid, Card, CardContent, Divider, Box, Button } from '@mui/material';
import { ShopLayout, CartList, OrderSummary } from './../../components';
import NextLink from 'next/link';

 const SummaryPage = () => {
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
                            <Button color='secondary' fullWidth className='circular-btn'>
                                Confirm Order
                            </Button>

                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SummaryPage;