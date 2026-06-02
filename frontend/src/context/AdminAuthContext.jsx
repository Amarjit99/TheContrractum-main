/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const AdminAuthContext = createContext();

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem('adminUser')) || null; } catch { return null; }
  });

  const login = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    if (!['admin', 'super-admin', 'manager', 'employee'].includes(data.role)) throw new Error('Access denied. Not an authorized account.');
    localStorage.setItem('adminUser', JSON.stringify(data));
    setAdmin(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('adminUser');
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, setAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() { return useContext(AdminAuthContext); }
