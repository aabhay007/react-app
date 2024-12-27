import React from 'react';
import UserList from '../components/Users/UserList';
import UserForm from '../components/Users/UserForm';

const UserManagementPage: React.FC = () => {
  return (
    <div>
      <h1>User Management</h1>
      <UserForm />
      <UserList />
    </div>
  );
};

export default UserManagementPage;
