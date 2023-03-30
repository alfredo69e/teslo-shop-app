import { ProductList } from './../components';
import { initialData } from '@/db/products';
import { Typography } from '@mui/material';
import { ShopLayout } from './../components';



export default function HomePage() {
  return (
    <ShopLayout title={'Teslo Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo Aqui'}>
      <Typography variant='h1' component={'h1'} > Store </Typography>
      <Typography variant='h2' sx={{ mb: 1 }} > All the Products </Typography>

      <ProductList products={ initialData.products as any } />
    </ShopLayout>
  )
}
