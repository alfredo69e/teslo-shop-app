import { ShopLayout, Loading, ProductList } from '@/components';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material';
import { GetServerSideProps } from 'next'
import { dbProducts } from '@/db';
import { IProduct } from '../../interfaces/products/product.interface';
import { FC } from 'react';

interface Props {
    products: IProduct[],
    foundProducts: boolean,
    query: string
}

 const SearchPage: FC< Props > = ({ products, foundProducts, query }) => {
  
    return (
      <ShopLayout title={'Teslo Shop - Search'} pageDescription={'Encuentra los mejores productos de Teslo Aqui'}>
        <Typography variant='h1' component={'h1'} > Search </Typography>
        {
            foundProducts && <Typography variant='h2' sx={{ mb: 1 }} > { query } </Typography>
        }

        {
            !foundProducts && <Typography variant='h1' sx={{ mb: 4, mt: 4 }} > No encontramos ningun producto con: { query } </Typography>
        }
  
  
        <ProductList products={ products || []} />
  
        
      </ShopLayout>
    )
  }

  // You should use getServerSideProps when:
  // - Only if you need to pre-render a page whose data must be fetched at request time
  export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    
    const { q = '' } = params  as { q: string };

    if( q.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    } 

    let products = await dbProducts.getProductsByTerm( q );

    const foundProducts = products.length > 0;

    console.log( ' foundProducts ', foundProducts );
    

    if( !foundProducts ) {
        products = await dbProducts.getAllProducts();
    }

    return {
        props: {
            products,
            foundProducts,
            query: q
        }
    }
  }


  export default SearchPage;