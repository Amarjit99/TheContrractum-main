import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminProtectedRoute({ children, allowedSubRoles, superAdminOnly }) {
  const { admin } = useAdminAuth();

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  if (superAdminOnly) {
    return admin.role === 'super-admin' ? children : <Navigate to="/admin/dashboard" replace />;
  }

  if (admin.role === 'super-admin') {
    return children;
  }

  if (allowedSubRoles && !allowedSubRoles.includes(admin.adminSubRole)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}
