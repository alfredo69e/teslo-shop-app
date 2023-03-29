import { initialData } from '@/db/products';
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { ShopLayout } from './../components';



export default function HomePage() {
  return (
    <ShopLayout title={'Teslo Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo Aqui'}>
      <Typography variant='h1' component={'h1'} > Store </Typography>
      <Typography variant='h2' sx={{ mb: 1 }} > All the Products </Typography>

      <Grid container spacing={ 4 } >
        {
          initialData.products.map(({ slug, images, title }) => (
            <Grid item xs={ 6 } sm={ 4 } key={ slug }>
              <Card>
                <CardActionArea>
                  <CardMedia component={'img'}
                    image={`products/${ images[0] }`}
                    alt={ title }
                  />
                </CardActionArea>
              </Card>

            </Grid>
          ))
        }
        
      </Grid>
    </ShopLayout>
  )
}
