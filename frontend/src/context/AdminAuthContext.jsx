/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AdminAuthContext = createContext();

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Decode a JWT payload without external libraries.
 * Returns null if decoding fails.
 */
function decodeJwtPayload(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

/**
 * Check whether a JWT is expired.
 * Adds a 60-second buffer so we don't use tokens that are about to expire.
 */
function isTokenExpired(token) {
  const payload = decodeJwtPayload(token);
  if (!payload || !payload.exp) return true;
  return Date.now() >= (payload.exp * 1000) - 60000; // 60s buffer
}

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try {
      const raw = localStorage.getItem('adminUser') || sessionStorage.getItem('adminUser');
      if (!raw) return null;
      const stored = JSON.parse(raw);
      if (!stored) return null;
      // Auto-clear expired tokens on load
      if (stored.token && isTokenExpired(stored.token)) {
        localStorage.removeItem('adminUser');
        sessionStorage.removeItem('adminUser');
        return null;
      }
      return stored;
    } catch {
      return null;
    }
  });

  const login = async (email, password, rememberMe = true) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    if (!['admin', 'super-admin', 'manager', 'employee'].includes(data.role)) throw new Error('Access denied. Not an authorized account.');

    // Store based on remember-me preference
    if (rememberMe) {
      localStorage.setItem('adminUser', JSON.stringify(data));
    } else {
      sessionStorage.setItem('adminUser', JSON.stringify(data));
    }
    setAdmin(data);
    return data;
  };

  const logout = useCallback(() => {
    localStorage.removeItem('adminUser');
    sessionStorage.removeItem('adminUser');
    setAdmin(null);
  }, []);

  /**
   * Authenticated fetch wrapper.
   * - Automatically attaches the Bearer token.
   * - Auto-logs out on 401 responses (expired/invalid token).
   * - Can be used as a drop-in replacement for fetch() in admin pages.
   */
  const authFetch = useCallback(async (url, options = {}) => {
    const currentAdmin = JSON.parse(localStorage.getItem('adminUser') || sessionStorage.getItem('adminUser') || 'null');
    const token = currentAdmin?.token;

    // If we already know the token is expired, logout immediately
    if (token && isTokenExpired(token)) {
      logout();
      throw new Error('Session expired. Please login again.');
    }

    const headers = {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // Only set Content-Type for non-FormData payloads
    if (options.body && !(options.body instanceof FormData)) {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    }

    const res = await fetch(url, { ...options, headers });

    // Auto-logout on 401 (token rejected by server)
    if (res.status === 401) {
      logout();
      // Redirect will happen via the ProtectedRoute, but we still throw
      throw new Error('Session expired. Please login again.');
    }

    return res;
  }, [logout]);

  /**
   * Update the admin context & storage after a profile change
   * without requiring a full re-login.
   */
  const updateAdminData = useCallback((updates) => {
    setAdmin(prev => {
      const updated = { ...prev, ...updates };
      // Persist to whichever storage is currently in use
      if (localStorage.getItem('adminUser')) {
        localStorage.setItem('adminUser', JSON.stringify(updated));
      } else {
        sessionStorage.setItem('adminUser', JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  // Periodic token expiry check (every 60 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = JSON.parse(localStorage.getItem('adminUser') || sessionStorage.getItem('adminUser') || 'null');
      if (stored?.token && isTokenExpired(stored.token)) {
        logout();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [logout]);

  return (
    <AdminAuthContext.Provider value={{ admin, setAdmin, login, logout, authFetch, updateAdminData }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() { return useContext(AdminAuthContext); }
