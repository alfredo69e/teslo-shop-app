import { AuthLoyout } from './../../components'
import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, TextField, Button, Chip, Divider } from '@mui/material';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { validations } from '@/utils';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { getProviders, getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';


type FormData = {
    email       : string,
    password    : string,
  };

 const LoginPage = () => {



    const { query } = useRouter();

    const [showErr, setShowErr] = useState( false );
    const [isDisabelBtn, setIsDisabelBtn] = useState( false );

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
      getProviders().then( ( prov ) => {
        setProviders( prov );
      })
    }, [])
    


    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onLoginUser = async( { email, password }: FormData ) => {

        setShowErr( false );
        setIsDisabelBtn( true );

        // const isValidLoggin = await onLoggin( email, password );

        // if( !isValidLoggin ) {
        //     setIsDisabelBtn( false );
        //     setShowErr( true );
        //     setTimeout(() => setShowErr( false ), 3000);
        //     return;
        // }

       
        // const destinations = query.p?.toString() || '/';
        // replace( destinations );

        try {
            await signIn( 'credentials', { email, password } )
        } catch ( err ) {
            setIsDisabelBtn( false );
            setShowErr( true );
            setTimeout(() => setShowErr( false ), 3000);
        }

        

    }

  return (
    <AuthLoyout title={'Login'}>
        <form onSubmit={ handleSubmit( onLoginUser ) } noValidate>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 }>
                        <Typography variant="h1" component={'h1'}> Login </Typography>
                        <Chip 
                            sx={{ display: showErr ? 'flex' : 'none' }}
                            label={'Invalid username or password'} 
                            color='error' 
                            icon={ <ErrorOutline /> } 
                            className='fadeIn' />
                        
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField 
                            label='Email' 
                            variant='filled' 
                            fullWidth 
                            { ...register('email', {
                                required: 'Enter Email',
                                validate: validations.isEmail
                            })}
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                            />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField 
                            label='Password' 
                            type={'password'} 
                            variant='filled' 
                            fullWidth 
                            { ...register('password', {
                                required: 'Enter password',
                                minLength: { value: 6, message: 'Min 6 Caracters' }
                            })}
                            error={ !!errors.password }
                            helperText={ errors.password?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <Button disabled={ isDisabelBtn } color='secondary' className='circular-btn' size='large' fullWidth type='submit'>
                            Sign In
                        </Button>
                    </Grid>
                    <Grid item xs={ 12 } display='flex' justifyContent={'end'}>
                        <NextLink href={ query.p ? `/auth/register?p=${ query.p?.toString() }` : '/auth/register'} passHref>
                            You do not have an account?
                        </NextLink>
                    </Grid>

                   
                    
                    <Grid item xs={ 12 } display='flex' flexDirection={'column'} justifyContent={'end'}>
                        <Divider sx={{ width: '100%',  mb: 2}} />
                        {
                           Object.values( providers ).map(( prov: any ) => 
                             (
                                <Button 
                                onClick={() => signIn( prov.id )}
                                key={ prov.id }
                                variant='outlined'
                                fullWidth
                                color={'primary'}
                                sx={{ mb: 1, display: prov.id === 'credentials' ? 'none' : 'block'  }}
                                > { prov.name } </Button>    
                            ) 
                           )
                        }
                    </Grid>
                </Grid>
            </Box> 
        </form> 
    </AuthLoyout>
  )
}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


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


export default LoginPage;