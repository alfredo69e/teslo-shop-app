import React, { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Box, CardActionArea, CardMedia, Grid, Typography, Button } from '@mui/material';
import { ItemCounter } from './../ui';
import { ICartProduct, IOrderItems, IProduct } from '../../interfaces';
import { CartContext } from './../../context';

interface Props {
    edit        ?: boolean;
    products    ?: IOrderItems[]
}

export const CartList: FC< Props > = ({ edit = false, products = [] }) => {

    const { cart, onRemoveProductCart, updateCartQuantity } = useContext( CartContext );

    const onUpdateQuatity = ( quantity: number,  product: ICartProduct ) => {
        product.quantity = quantity;
        updateCartQuantity( product );
    }

    const productsToShow = products.length > 0 ? products : cart;
   
  return (
    <>
        {
            productsToShow.map(( product, index ) => (
               <Grid container sx={{ mb: 1 }} spacing={ 2 } key={ index }  >
                <Grid item xs={ 3 } >
                    <NextLink href={`/product/${ product.slug }`} passHref>
                        <CardActionArea>
                            <CardMedia 
                                component={'img'}
                                image={`/products/${ product.image }`}
                                alt={ product.title }
                                sx={{ borderRadius: 2 }}
                                />
                        </CardActionArea>
                    </NextLink>
                </Grid>
                <Grid item xs={ 7 }>
                    <Box display={'flex'} flexDirection='column' alignItems={'start'}>
                        <Typography variant="body1" > { product.title } </Typography>
                        <Typography variant="body1" > Size: <strong> { product.size! } </strong></Typography>
                        {/* Condicional */}
                        {
                            ( edit )
                            ? <ItemCounter quantity={ product.quantity } onChangeQuantity={ ( quantity ) =>  onUpdateQuatity( quantity, product as ICartProduct ) } valueMAx={ 10 }  />
                            : <Typography variant="h5"> { product.quantity } { product.quantity > 1 ? 'Products' : 'Product' }  </Typography>
                        }
                        

                        
                    </Box>
                </Grid>
                <Grid item xs={ 2 } display='flex' alignItems={'center'} flexDirection='column'>
                    <Typography variant="subtitle1"> { `$${ product.price }` } </Typography>
                    
                    {
                        ( edit ) && (
                            <Button variant="text" color="secondary" onClick={ () => onRemoveProductCart( product as ICartProduct ) }>
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
