import React, { FC } from 'react';
import { initialData } from '../../db/products';
import NextLink from 'next/link';
import { Box, CardActionArea, CardMedia, Grid, Typography, Button } from '@mui/material';
import { ItemCounter } from './../ui';

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

interface Props {
    edit?: boolean;
}

export const CartList: FC< Props > = ({ edit = false }) => {

   
  return (
    <>
        {
            productsInCart.map(( product, index ) => (
               <Grid container sx={{ mb: 1 }} spacing={ 2 } key={ index }  >
                <Grid item xs={ 3 } >
                    {/* TODO: llevar a la pagina dle product */}
                    <NextLink href={'/product/slug'} passHref>
                        <CardActionArea>
                            <CardMedia 
                                component={'img'}
                                image={`/products/${ product.images[0] }`}
                                alt={ product.description }
                                sx={{ borderRadius: 2 }}
                                />
                        </CardActionArea>
                    </NextLink>
                </Grid>
                <Grid item xs={ 7 }>
                    <Box display={'flex'} flexDirection='column' alignItems={'start'}>
                        <Typography variant="body1" > { product.title } </Typography>
                        <Typography variant="body1" > Size: <strong> M </strong></Typography>
                        {/* Condicional */}
                        {
                            ( edit )
                            ? <ItemCounter />
                            : <Typography variant="h5"> 3 </Typography>
                        }
                        

                        
                    </Box>
                </Grid>
                <Grid item xs={ 2 } display='flex' alignItems={'center'} flexDirection='column'>
                    <Typography variant="subtitle1"> { `$${ product.price }` } </Typography>
                    
                    {
                        ( edit ) && (
                            <Button variant="text" color="secondary">
                                Remove
                            </Button>
                        )
                    }
                    
                    
                </Grid>

               </Grid>
            ))
        }
    </>
  )
}
