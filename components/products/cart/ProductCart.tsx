import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { IProduct } from './../../../interfaces';
import NextLink from 'next/link';


interface Props {
    product: IProduct
}

export const ProductCart: FC< Props > = ({ product }) => {

    const { title, slug, images, price } = product;

    const [isHover, setIsHover] = useState( false );

    const productImage = useMemo(() => ( isHover ) ? `products/${images[1]}` : `products/${images[0]}`, [ isHover, images ])

  return (
    <Grid item xs={ 6 } sm={ 4 } key={ slug } 
      onMouseEnter={ () => setIsHover( true ) }
      onMouseLeave={ () => setIsHover( false ) }
      
      >
        <NextLink href={'product/slug'} passHref prefetch={ false }>
          <Card>
            <CardActionArea>
                <CardMedia 
                  className='fadeIn'
                  component={'img'}
                  image={ productImage }
                  alt={ title }
                />
            </CardActionArea>
          </Card>
        </NextLink>
        
        <Box sx={{ mt: 1 }} className={'fadeIn'}>
          <Typography fontWeight={700} > { title } </Typography>
          <Typography fontWeight={500}> { `$${ price }` } </Typography>

        </Box>

    </Grid>
  )
}
