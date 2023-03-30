import React from 'react'
import { ShopLayout } from './../../components';
import Typography from '@mui/material/Typography'
import { Grid, TextField, FormControl, FormLabel, FormHelperText, InputLabel, MenuItem, Select, Box, Button } from '@mui/material';

 const AddressPage = () => {
  return (
    <ShopLayout title={'Address'} pageDescription={'Confirm your Address'}>
        <Typography variant="h1" component={'h1'}> Address </Typography>
        <Grid container spacing={ 2 }>
            <Grid item xs={ 12 }  sm={ 6 } >
              <TextField
                label="Name" variant='filled'
                fullWidth
              />
             
            </Grid>
            <Grid item xs={ 12 }  sm={ 6 } >
                <TextField
                    label="Last Name" variant='filled'
                    fullWidth
                />
            </Grid>
            <Grid item xs={ 12 }  sm={ 6 } >
                <TextField
                    label="Address" variant='filled'
                    fullWidth
                />
            </Grid>
            <Grid item xs={ 12 }  sm={ 6 } >
                <TextField
                    label="Address 2 ( opcional ) " variant='filled'
                    fullWidth
                />
            </Grid>
           
            <Grid item xs={ 12 }  sm={ 6 } >
                <TextField
                    label="Code Postal " variant='filled'
                    fullWidth
                />
            </Grid>
            <Grid item xs={ 12 }  sm={ 6 } >
                <FormControl fullWidth>
                    <Select 
                        variant='filled'
                        label='Country'
                        value={1}
                    >
                        <MenuItem value={ 1 }> Panama </MenuItem>
                        <MenuItem value={ 2 }> Cosnta Rica </MenuItem>
                        <MenuItem value={ 3 }> Colombia </MenuItem>

                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={ 12 }  sm={ 6 } >
                <TextField
                    label="City " variant='filled'
                    fullWidth
                />
            </Grid>

            <Grid item xs={ 12 }  sm={ 6 } >
                <TextField
                    label="Tlf " variant='filled'
                    fullWidth
                />
            </Grid>
           
        </Grid>
        <Box sx={{ mt: 5 }} display='flex' justifyContent={'center'}>
            <Button  color="secondary" className='circular-btn' size='large'>
                check order 
            </Button>
        </Box>
    </ShopLayout>
  )
}

export default AddressPage;