import { Loading, ProductList } from './../components';
import { Typography } from '@mui/material';
import { ShopLayout } from './../components';
import { useProducts } from './../hooks';




export default function HomePage() {

  
  

  const { data, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'Teslo Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo Aqui'}>
      <Typography variant='h1' component={'h1'} > Store </Typography>
      <Typography variant='h2' sx={{ mb: 1 }} > All the Products </Typography>


      {
        (isLoading) 
          ? <Loading />
          : <ProductList products={ data || []} />
      }

      
    </ShopLayout>
  )
}
