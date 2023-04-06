import React, { useContext, useState } from 'react'
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';
import { AuthLoyout } from './../../components'
import { Box, Grid, Typography, TextField, Button, Chip } from '@mui/material';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { validations } from '@/utils';
import { ErrorOutline } from '@mui/icons-material';
// import { tesloApi } from '../../api';
import { AuthContext } from '@/context';


type FormData = {
    email       : string,
    password    : string,
    name        : string;
  };

 const RegisterPage = () => {

    const { onRegister } = useContext( AuthContext );
    const { replace, query } = useRouter();

    const [showErr, setShowErr] = useState( false );
    const [isDisabelBtn, setIsDisabelBtn] = useState( false );
    const [errMessage, setErrMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onRegisterUser = async( { email, password, name }: FormData ) => {

        setIsDisabelBtn(true);
        setShowErr(false);

        const { hasError, message } = await onRegister( email, password, name  );

        if ( hasError ) {
            setErrMessage( message || '' );
            setIsDisabelBtn( false );
            setShowErr( true );
            setTimeout(() => setShowErr( false ), 3000)
            return;
        }

        // const destinations = query.p?.toString() || '/';
        // replace( destinations );

        await signIn( 'credentials', { email, password } )

    }

    
  return (
    <AuthLoyout title={'Register'}>
        <form onSubmit={ handleSubmit( onRegisterUser ) } noValidate>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 }>
                        <Typography variant="h1" component={'h1'}> Register </Typography>
                        <Chip 
                            sx={{ display: showErr ? 'flex' : 'none' }}
                            label={ errMessage } 
                            color='error' 
                            icon={ <ErrorOutline /> } 
                            className='fadeIn' />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField 
                            label='Full Name' variant='filled' fullWidth
                            { ...register('name', {
                                required: 'Enter Name'
                            }) }
                            error={ !!errors.name }
                            helperText={ errors.name?.message }
                            />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField label='Email' variant='filled' fullWidth 
                            { ...register('email', {
                                required: 'Enter Email',
                                validate: validations.isEmail
                            }) }
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField label='Password' type={'password'} variant='filled' fullWidth 
                        { ...register('password', {
                            required: 'Enter Password',
                            minLength: { value: 6, message: 'Min 6 Caracters' }
                        }) }
                        error={ !!errors.password }
                        helperText={ errors.password?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <Button type='submit' disabled={ isDisabelBtn } color='secondary' className='circular-btn' size='large' fullWidth>
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid item xs={ 12 } display='flex' justifyContent={'end'}>
                        <NextLink href={ query.p ? `/auth/login?p=${ query.p?.toString() }` : '/auth/login' } passHref>
                            Do you already have an account?
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>  
        </form>
    </AuthLoyout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const session = await getSession({ req });

    const { p = '/' } = query;

    if( session ) {
        
        // replace( destinations );
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }

    } 



    return {
        props: {
            
        }
    }
}

export default RegisterPage;