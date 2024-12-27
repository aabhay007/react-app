import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  return token ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
