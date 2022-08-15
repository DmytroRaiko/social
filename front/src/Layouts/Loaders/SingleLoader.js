import { CircularProgress } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';

export const SingleLoader = ({ show }) => (show && (
  <Box sx={{ display: 'flex', width: '100%' }}>
    <CircularProgress sx={{ margin: '20px auto' }} />
  </Box>
));
