import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

// Protected route component that checks if user is authenticated
const PrivateRoute = () => {
  const { isAuthenticated } = useContext(UserContext);

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the protected component
  return <Outlet />;
};

export default PrivateRoute;
