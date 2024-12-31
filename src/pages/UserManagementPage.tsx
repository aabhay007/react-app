import React from 'react';
import UserList from '../components/Users/UserList';
import UserForm from '../components/Users/UserForm';
import Navbar from '../components/Navbar/Navbar';

const UserManagementPage: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <h1 style={{color:'black'}}>User Management</h1>
      <UserForm />
      <UserList />
    </div>
  );
};

export default UserManagementPage;
