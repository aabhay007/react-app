import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import {
  fetchUsersAction,
  addUserAction,
  deleteUserAction,
  editUserAction,
} from '../features/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch,RootState } from '../app/store'; // Ensure this is pointing to your store type
import Navbar from '../components/Navbar/Navbar';

const UserManagementPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<{ id: number; username: string; email: string } | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  const handleAddUser = () => {
    dispatch(addUserAction({ username, email, password }));
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleEditUser = (user: { id: number; username: string; email: string }) => {
    setEditing(true);
    setEditedUser(user);
    setUsername(user.username);
    setEmail(user.email);
  };

  const handleSaveEditedUser = () => {
    if (editedUser) {
      dispatch(editUserAction({ id: editedUser.id, username, email }));
      setEditing(false);
      setEditedUser(null);
      setUsername('');
      setEmail('');
    }
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUserAction(id));
  };

  return (
    <div>
      <Navbar/>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mt: 4, mb: 2, color: 'black', textAlign: 'center' }}
      >
        User Management
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ mt: 4, maxWidth: 800, margin: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEditUser(user)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, mb: 2, color: 'black', textAlign: 'center' }}
      >
        {editing ? 'Edit User' : 'Add User'}
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editing) {
            handleSaveEditedUser();
          } else {
            handleAddUser();
          }
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        {!editing && (
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {editing ? 'Save Changes' : 'Add User'}
        </Button>
      </form>
    </div>
  );
};

export default UserManagementPage;
