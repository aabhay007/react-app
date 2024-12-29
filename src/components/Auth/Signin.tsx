import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
const Signin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('signin/', { username, password });
      if (response.status === 200) {
        const token = response.data.token;
        dispatch(login(token));
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{color:'grey.600'}}>Sign In</Typography>
      <form onSubmit={handleSignin}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </Box>
      </form>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Container>
  );
};

export default Signin;
