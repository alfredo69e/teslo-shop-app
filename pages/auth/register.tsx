import { AuthLoyout } from './../../components'
import React from 'react'
import { Box, Grid, Typography, TextField, Button } from '@mui/material';
import NextLink from 'next/link';

 const RegisterPage = () => {
  return (
    <AuthLoyout title={'Register'}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
            <Grid container spacing={ 2 }>
                <Grid item xs={ 12 }>
                    <Typography variant="h1" component={'h1'}> Register </Typography>
                </Grid>
                <Grid item xs={ 12 }>
                    <TextField label='Full Name' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={ 12 }>
                    <TextField label='Email' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={ 12 }>
                    <TextField label='Password' type={'password'} variant='filled' fullWidth />
                </Grid>
                <Grid item xs={ 12 }>
                    <Button color='secondary' className='circular-btn' size='large' fullWidth>
                        Sign Up
                    </Button>
                </Grid>
                <Grid item xs={ 12 } display='flex' justifyContent={'end'}>
                    <NextLink href={'/auth/login'} passHref>
                        Do you already have an account?
                    </NextLink>
                </Grid>
            </Grid>
        </Box>  
    </AuthLoyout>
  )
}

export default RegisterPage;