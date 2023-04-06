import { ShopLayout, CartList, OrderSummary } from './../../components';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Chip, CircularProgress } from '@mui/material';

import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { GetServerSideProps } from 'next'
import { FC, useState } from 'react';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/db';
import { IOrder } from '@/interfaces';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { tesloApi } from '@/api';
import { useRouter } from 'next/router';


export type OrderResponseBody = {
    id: string;
    status: 
        | 'COMPLETED'
        | 'SAVED'
        | 'APPROVED'
        | 'VOIDED'
        | 'PAYER_ACTION_REQUIRED'
        | 'CREATED'
}

interface Props {
    order: IOrder;
}

 const OrderPage: FC< Props > = ({ order }) => {

    const { reload } = useRouter();

    const [isPaying, setIsPaying] = useState(false)

    const { _id, numberOfItem, total, subTotal, tax, isPay, shippingAddress, orderItems } = order;


    const onOrderCompleted = async ( { id, status } : OrderResponseBody ) => {

        

        if( status !== 'COMPLETED' ) return alert('No Hay Pago');

        setIsPaying( true );

        try {

            await tesloApi.post('/orders/pay', { transactionId: id, orderId: _id });

            reload();
            
        } catch ( err ) {
            setIsPaying( false );
            console.log( 'err ', err );
            
        }
    }
    
  return (
    <ShopLayout title={`Summary Order`} pageDescription={'Order summary'} >
        <Typography variant="h1" component={'h1'}> Order: { _id } </Typography>

        {
            isPay 
            ? (
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
            ) 
            : (
                <Chip 
                    sx={{
                        my: 2,
                        padding: 2
                    }} 
                    label='Pending Of Pay'
                    variant='outlined'
                    color='error'
                    icon={ <CreditCardOffOutlined /> }
                />
            )
        }
       
       

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList products={ orderItems }/>
            </Grid>
            <Grid item  xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant="h2" component={'h2'}> Summary ( { numberOfItem } - {numberOfItem > 1 ? 'Products' : 'Product' } ) </Typography>
                        <Divider sx={{ my: 1 }} />

                        <Box display={'flex'} justifyContent='space-between'>
                        <Typography variant="subtitle1" > Address </Typography>
                        {/* <NextLink href={'/checkout/address'} passHref>
                            <Typography variant='h6' >Edit</Typography>

                        </NextLink> */}
                        
                        </Box>

                        
                        <Typography  > { shippingAddress.firstName } { shippingAddress.lastName } </Typography>
                        <Typography  > { shippingAddress.zip } </Typography>
                        <Typography  > { shippingAddress.address } { shippingAddress.address2 || '' } </Typography>
                        <Typography  > { shippingAddress.country } </Typography>
                        <Typography  > { shippingAddress.phone } </Typography>

                        <Divider sx={{ my: 1 }} />
                        
                        <OrderSummary pay={ { numberOfItem, total, subTotal, tax } } />

                        <Box sx={{ mt: 3 }}>
                            {/* TODO: */}

                            
                            
                            <Box sx={{ display: isPaying ? 'flex' : 'none' }} justifyContent={'center'} className='fadeIn'>

                                <CircularProgress />
                            </Box>

                            <Box sx={{ display: !isPaying ? 'flex' : 'none' }} flex={1} flexDirection={'column'} >

                            {
                                isPay 
                                ? (
                                   
                                    <Chip 
                                        sx={{
                                            my: 2,
                                            padding: 2,
                                            display: 'flex'
                                        }} 
                                        label='Order was paid'
                                        variant='outlined'
                                        color='success'
                                        icon={ <CreditScoreOutlined /> }
                                    /> 
                                ) 
                                : (
                                     <PayPalButtons
                                        createOrder={( data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: total.toString(),
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order!.capture().then(( details ) => {

                                                onOrderCompleted( details );

                                            });
                                        }}
                                     />
                                    
                                )
                            }

                            </Box>
                            

                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { uid = '' } = query;
    
    const session : any  = await getSession({ req });

    // console.log(' session ', session);
    

    if( !session ) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${ uid }`,
                permanent: false
            }
        }

    }

    const order = await dbOrders.getOrderById( uid.toString() );
    
    if( !order ) {
        return {
            redirect: {
                destination: `/auth/history`,
                permanent: false
            }
        }
    }

    if( order.user !== session.user._id ) {
        return {
            redirect: {
                destination: `/auth/history`,
                permanent: false
            }
        }
    }


    return {
        props: {
            order
        }
    }
}

export default OrderPage;