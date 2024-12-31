import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { logout } from '../../features/authSlice';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/signin'); // Redirect to the sign-in page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My Application
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {!token && (
          <>
            <Button color="inherit" component={Link} to="/signin">
              Sign In
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        )}
        {token && (
          <>
            <Button color="inherit" component={Link} to="/user-management">
              User Management
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Sign Out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;