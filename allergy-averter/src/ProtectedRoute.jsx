// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { SessionContext } from './SessionProvider';
import { Navigate } from 'react-router-dom';

// Component for protecting routes
const ProtectedRoute = ({ element }) => {
  const session = useContext(SessionContext); // Access session context

  // Check if session exists
  if (!session) {
    return <Navigate to="/login" replace />;  // Redirect to login page if not authenticated
  }

  return element;  // Render the element if authenticated
};

export default ProtectedRoute;