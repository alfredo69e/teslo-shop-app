import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { ShopLayout } from './../../components';
import { Chip, Button } from '@mui/material';
import NextLink from 'next/link';

const rows: GridRowsProp = [
    { id: 1,    paid: false,  FullName: 'Hello', seeOrder: 'See Order' },
    { id: 2,    paid: false,  FullName: 'Hello', seeOrder: 'See Order' },
    { id: 3,    paid: true,   FullName: 'Hello', seeOrder: 'See Order' },
    { id: 4,    paid: true,   FullName: 'Hello', seeOrder: 'See Order' },
    { id: 5,    paid: false,  FullName: 'Hello', seeOrder: 'See Order' },
    { id: 6,    paid: true,   FullName: 'Hello', seeOrder: 'See Order' },
    { id: 7,    paid: false,  FullName: 'Hello', seeOrder: 'See Order' },
    // { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    // { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];
  
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
    {
        field: 'seeOrder',
        headerName: 'See Order',
        width: 200,
        sortable: false,
        renderCell: ( params ) => 
            <NextLink href={ `/orders/${params.row.id}` } passHref>
                    Checkout
            </NextLink>
    },

  ];

 const HistoryPage = () => {
  return (
    <ShopLayout title={`Summary Order 12345`} pageDescription={'Order summary'} >
        <Typography variant="h1" component={'h1'}> History of Orders </Typography>
        <Grid container >
            <Grid item xs={ 12 } sx={{ height: 650, width: '100%' }}>
                <DataGrid 
                    columns={ columns } 
                    rows={ rows }
                    // autoPageSize={ false }
                    // pageSizeOptions={ [10] }
                />

            </Grid>
          
        </Grid>
    </ShopLayout>
  )
}

export default HistoryPage;