import React, { FC, useContext, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { dbProducts } from '@/db';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ItemCounter, ProductSlideshow, ShopLayout, SizeSelector } from '../../components';
import { ICartProduct, IProduct, IValidSizes } from '../../interfaces';
import { CartContext } from './../../context';
import { useRouter } from 'next/router';

interface Props {
  product: IProduct
}

 const ProductPage: FC< Props > = ({ product }) => {

  const { push } = useRouter();

 const { onAddProductCart } = useContext( CartContext );

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    images: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onSelectSize = ( size: IValidSizes ) => {
    setTempCartProduct(( currentProduct ) => ({
      ...currentProduct,
      size
    }));
  }

  const onUpdateQuatity = ( value: number ) => {

    setTempCartProduct(( currentProduct ) => ({
      ...currentProduct,
      quantity: value
    }))

  }


    const onAddProduct = () => {
      if( !tempCartProduct.size ) return;

      onAddProductCart( tempCartProduct );
      push('/cart');
    }

  return (
    <ShopLayout title={ product.title } pageDescription={ product.description }>
      <Grid container spacing={ 3 } >
        <Grid item xs={ 12 } sm={ 7 } >
          <ProductSlideshow slideImages={ product.images } />
        </Grid>
        <Grid item xs={ 12 } sm={ 5 }>
          <Box display={'flex'} flexDirection={'column'}>
            
            {/* Titulos */}
            <Typography variant='h1' component={'h1'} > { product.title } </Typography>
            <Typography variant='h2' component={'h2'} > { `$${ product.price }` } </Typography>
            {/* Cantidad */}
            <Box sx={{ my: 2 }} >
              <Typography variant='subtitle2' > Cantidad </Typography>
              <ItemCounter onChangeQuantity={ onUpdateQuatity } quantity={ tempCartProduct.quantity } valueMAx={ 10 } />
              <SizeSelector selectSize={ tempCartProduct.size } sizes={ product.sizes } onSelectSize={ onSelectSize } />
            </Box>

            {/* Add To Cart */}

            

            {
                product.inStock >  0 
                ? (
                  <Button color={'secondary'} className={'circular-btn'} onClick={ onAddProduct }>
                        {
                         ( tempCartProduct.size ) 
                         ? 'Add To Cart'
                         : 'Select a size'
                        }
                  </Button>
                )
                : (
                  <Chip label={'No available'} color={'error'} variant='outlined' />
                )
            }

            {/* Description */}
            <Box sx={{ mt: 3 }} >
              <Typography variant='subtitle2'  > Description </Typography>
              <Typography variant='body2' > { product.description } </Typography>

            </Box>
            
          </Box>

        </Grid>
        
      </Grid>
    </ShopLayout>
  )
}




// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
   
//   const { slug } = params as { slug: string };

//   const product = await dbProducts.getProductBySlug( slug );

//   if( !product ) {
//       return {
//           redirect: {
//               destination: '/',
//               permanent: false
//           }
//       }
//   }
  
//   return {
//       props: {
//           product
//       }
//   }
// }

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async ( ctx ) => {

  const productsSlugs = await dbProducts.getAllProductsSlug();

  return {
    paths: productsSlugs.map(( { slug } ) => ({
      params: {
        slug
      }
    }) ),
    fallback: 'blocking'
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { slug = '' } = params as { slug: string };

  const product = await dbProducts.getProductBySlug( slug );

  if( !product ) {
      return {
          redirect: {
              destination: '/',
              permanent: false
          }
      }
  } 

  return {
    props: {
      product
    },
    revalidate: 86400 // 24 horas
  }
}

export default ProductPage;