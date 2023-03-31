import { Box, Card, CardActionArea, CardMedia, CircularProgress, Grid, Skeleton, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { IProduct } from './../../../interfaces';
import NextLink from 'next/link';


interface Props {
    product: IProduct
}

export const ProductCart: FC< Props > = ({ product }) => {

    const { title, slug, images, price } = product;

    const [isHover, setIsHover] = useState( false );
    const [isImageLoader, setIsImageLoader] = useState( false );

    const productImage = useMemo(() => ( isHover ) ? `/products/${images[1]}` : `/products/${images[0]}`, [ isHover, images ])

  return (
    <Grid item xs={ 6 } sm={ 4 } key={ slug } 
      onMouseEnter={ () => setIsHover( true ) }
      onMouseLeave={ () => setIsHover( false ) }
      
      >
        <NextLink href={`/product/${slug}`} passHref prefetch={ false }>
          <Card>
            <CardActionArea>
                <CardMedia 
                  className='animate__animated animate__zoomIn animate__fast'
                  component={ 'img' }
                  image={ productImage }
                  alt={ title }
                  loading='lazy'
                  onLoad={ () => setTimeout(() => { setIsImageLoader( true ) }, 1000) }
                />
            </CardActionArea>
          </Card>
        </NextLink>

        <Box sx={{ mt: 1 }} className={'fadeIn'}>
                <Typography fontWeight={700} > { !isImageLoader ? <Skeleton animation="wave"  /> : title }  </Typography>
                <Typography fontWeight={500}>  { !isImageLoader ? <Skeleton animation="wave" /> : `$${ price }` } </Typography>

              </Box>
        
        

    </Grid>
  )
}
