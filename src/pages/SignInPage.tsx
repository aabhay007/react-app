import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Signin from '../components/Auth/Signin';

const SigninPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" sx={{color:'grey.600'}}>Sign In</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Access your account by signing in below.
        </Typography>
      </Box>
      <Signin />
    </Container>
  );
};

export default SigninPage;
