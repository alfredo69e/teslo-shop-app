import { Box, CircularProgress, Typography } from '@mui/material';

export const Loading = () => {
  return (
    <Box display={'flex'} flexDirection='column' justifyContent='center' alignItems={'center'} height={'calc( 100vh - 200px )'}>
        <Typography variant='h3' > Loading... </Typography>
        <CircularProgress sx={{ my: 2 }} />
    </Box>
  )
}
