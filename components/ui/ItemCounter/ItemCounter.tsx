import React, { FC } from 'react';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

interface Props {
  quantity: number;
  valueMAx: number;
  onChangeQuantity: ( value: number ) => void
}

export const ItemCounter: FC< Props > = ({ quantity, onChangeQuantity, valueMAx }) => {


  const updateAddQuantity = ( value: number ) => {

    const valueQuantity = quantity + 1;

    if( valueQuantity === valueMAx ) return;

    onChangeQuantity( valueQuantity );

  }
  const updateRemovedQuantity = ( value: number ) => {

    const valueQuantity = quantity - 1;

    if( valueQuantity === 0 ) return;

    onChangeQuantity( valueQuantity );

  }


  return (
    <Box display={'flex'} alignItems='center'>
        <IconButton onClick={ () => updateRemovedQuantity( -1 ) }>
            <RemoveCircleOutline />
        </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center' }}> { quantity } </Typography>

        <IconButton onClick={ () => updateAddQuantity( +1 ) }>
            <AddCircleOutline />
        </IconButton>
        
    </Box>
  )
}
