

import { FC } from 'react';
import { Loading, ProductList, ShopLayout } from './../../components';
import { useRouter } from 'next/router'
import { useProducts } from './../../hooks';
import { capitalize, Typography } from '@mui/material';


const CategoryPage = () => {

    const router = useRouter();
    
    const search = router.asPath.split('/').pop();

    const { data, isLoading } = useProducts(`/products?gender=${ search }`);
    
  return (
    <ShopLayout title={`Teslo Shop - ${ search }`} pageDescription={`Encuentra los mejores productos de Teslo para ${search} `} >
        <Typography variant='h1' component={'h1'} > search </Typography>
      <Typography variant='h2' sx={{ mb: 1 }} > All the Products <strong> { capitalize(search || '') } </strong> </Typography>


      {
        (isLoading) 
          ? <Loading />
          : <ProductList products={ data || []} />
      }


    </ShopLayout>
  )
}

export default CategoryPage;