import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { ShopLayout } from './../../components';
import { Chip, Button } from '@mui/material';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC } from 'react';
import { dbOrders } from '@/db';
import { IOrder } from '@/interfaces';

  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'FullName', headerName: 'Full Name', width: 300},
    {
        field: 'paid',
        headerName: 'Paid',
        description: 'Muestra informacion si esta pagada la order o no',
        width: 200,
        renderCell: ( params ) => {
            return (
                params.row.paid 
                    ? <Chip color='success' label='Paid' variant='outlined' />
                    : <Chip color='error' label='Not Paid' variant='outlined' />
            )
        }
    },
    { field: 'idOrder', headerName: 'Number #', width: 300, sortable: false, },
    {
        field: 'seeOrder',
        headerName: 'See Order',
        width: 200,
        sortable: false,
        renderCell: ( params ) => 
            <NextLink href={ `/orders/${params.row.idOrder.toString().split(' ').pop()}` } passHref style={{ textDecoration: 'none' }} color='primary'>
                    See Order
            </NextLink>
    },

  ];

  interface Props {
    orders: IOrder[]
  }

 const HistoryPage: FC< Props > = ({ orders }) => {


    
  return (
    <ShopLayout title={`Summary Order 12345`} pageDescription={'Order summary'} >
        <Typography variant="h1" component={'h1'}> History of Orders </Typography>
        <Grid container >
            <Grid item xs={ 12 } sx={{ height: 650, width: '100%' }}>
                <DataGrid 
                    columns={ columns } 
                    rows={ orders.map(({ _id, isPay, shippingAddress }, index) => ({
                        id: index + 1,
                        paid: isPay,  
                        FullName: `${shippingAddress.firstName} ${shippingAddress.lastName}`, 
                        idOrder: `N#: ${_id}`,
                        seeOrder: 'See Order'
                    })) }
                    // autoPageSize={ false }
                    // pageSizeOptions={ [10] }
                />

            </Grid>
          
        </Grid>
    </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
   
    
    
    const session : any = await getSession({ req });

    if( !session ) {
        return {
            redirect: {
                destination: `/auth/login?p=orders/history`,
                permanent: false,
            }
        }
    }
    

    const orders = await dbOrders.getOrderByUser( session.user._id );

    return {
        props: {
            orders
        }
    }
}

export default HistoryPage;