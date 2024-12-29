import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Signup from '../components/Auth/Signup';

const SignupPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" sx={{color:'grey.600'}}>Sign Up</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Create your account by filling out the details below.
        </Typography>
      </Box>
      <Signup />
    </Container>
  );
};

export default SignupPage;
