import { Box, Button } from '@mui/material';
import React, { FC } from 'react';
import { IValidSizes } from './../../../interfaces';

interface Props {
    selectSize?: string;
    sizes: IValidSizes[]
}

export const SizeSelector: FC< Props > = ({ selectSize, sizes }) => {
  return (
    <Box sx={{ mt: 2 }}>
        {
            sizes.map(( size, index ) => (
                <Button key={ index }
                    size='small'
                    color={ selectSize === size ? 'primary' : 'info' }
                >{ size }</Button>
            ))
        }
    </Box>
  )
}
