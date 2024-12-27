import React, { useState } from 'react';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice';

const Signin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('signin/', { username, password });
      if (response.status === 200) {
        // Assuming the API returns a token
        const token = response.data.token;
        dispatch(login(token)); // Pass the token to the login action
        alert('Sign in successful!');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Signin;
