import React, { useContext, useEffect } from 'react'
import { ShopLayout } from './../../components';
import Typography from '@mui/material/Typography'
import { Grid, TextField, FormControl,  MenuItem, Box, Button } from '@mui/material';
import { countries, jwt } from '@/utils';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { CartContext } from '@/context';

type FormData = {
    firstName   : string;
    lastName    : string;
    address     : string;
    address2    : string;
    zip         : string;
    city        : string;
    country     : string;
    phone       : string;
}

const getFromCookiesFromCookies = (): FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
    }
}


 const AddressPage = () => {

    const { push } = useRouter();

    const { updateAddress } = useContext( CartContext );

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: getFromCookiesFromCookies()
    });

    useEffect(() => {
            reset( getFromCookiesFromCookies() )
    }, [ reset ])
   

    const onRegisterAddress = ( data: FormData ) => {
    
        updateAddress( data );

        push('/checkout/summary');
    }

  return (
    <ShopLayout title={'Address'} pageDescription={'Confirm your Address'}>
        <form onSubmit={ handleSubmit( onRegisterAddress ) } noValidate>
        <Typography variant="h1" component={'h1'}> Address </Typography>
        <Grid container spacing={ 2 }>
            <Grid item xs={ 12 }  sm={ 6 } >
              <TextField
                label="Name" variant='filled'
                fullWidth
                { ...register( 'firstName', {
                    required: 'Enter First Name'
                } ) }
                error={!! errors.firstName }
                helperText={ errors.firstName?.message }
              />
             
            </Grid>
            <Grid item xs={ 12 }  sm={ 6 } >
                <TextField
                    label="Last Name" variant='filled'
                    fullWidth
                    { ...register( 'lastName', {
                        required: 'Enter Last Name'
                    } ) }
                    error={!! errors.lastName }
                    helperText={ errors.lastName?.message }
                />
            </Grid>
            <Grid item xs={ 12 }  sm={ 6 } >
                <TextField
                    label="Address" variant='filled'
                    fullWidth
                    { ...register( 'address', {
                        required: 'Enter Last Name'
                    } ) }
                    error={!! errors.address }
                    helperText={ errors.address?.message }
                />
            </Grid>
            <Grid item xs={ 12 }  sm={ 6 } >
                <TextField
                    label="Address 2 ( opcional ) " variant='filled'
                    fullWidth
                    { ...register( 'address2' ) }
                />
            </Grid>
           
            <Grid item xs={ 12 }  sm={ 6 } >
                <TextField
                    label="Code Postal " variant='filled'
                    fullWidth
                    { ...register( 'zip', {
                        required: 'Enter zip'
                    } ) }
                    error={!! errors.zip }
                    helperText={ errors.zip?.message }
                />
            </Grid>
            <Grid item xs={ 12 }  sm={ 6 } >
                <FormControl fullWidth>
                    <TextField 
                        select
                        variant='filled'
                        label='Country'
                        defaultValue={ countries[0].code }
                        { ...register( 'country', {
                            required: 'Enter country'
                        } ) }
                        error={!! errors.country }
                    >
                        {
                            countries.map(( { name, code }, index ) => (
                                <MenuItem key={ index } value={ code }> { name } </MenuItem>
                            ))
                        }
                        
                        

                    </TextField>
                </FormControl>
            </Grid>
            <Grid item xs={ 12 }  sm={ 6 } >
                <TextField
                    label="City " variant='filled'
                    fullWidth
                    { ...register( 'city', {
                        required: 'Enter city'
                    } ) }
                    error={!! errors.city }
                    helperText={ errors.city?.message }
                />
            </Grid>

            <Grid item xs={ 12 }  sm={ 6 } >
                <TextField
                type='phone'
                    label="Tlf " variant='filled'
                    fullWidth
                    { ...register( 'phone', {
                        required: 'Enter phone'
                    } ) }
                    error={!! errors.phone }
                    helperText={ errors.phone?.message }
                />
            </Grid>
           
        </Grid>
        <Box sx={{ mt: 5 }} display='flex' justifyContent={'center'}>
            <Button type='submit' color="secondary" className='circular-btn' size='large'>
                check order 
            </Button>
        </Box>
        </form>
    </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
//     const { token = '' } = req.cookies;

//     let isValidToken = false;

//     try {
//         await jwt.isValidToken( token );
//         isValidToken = true
//     } catch ( err ) {
//         isValidToken = false;
//     }

//     if(!isValidToken) {
//         return{
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false
//             },
            
//         }
//     }


//     return {
//         props: {
            
//         }
//     }
// }

export default AddressPage;