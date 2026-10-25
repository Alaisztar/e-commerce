// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockUsers';

export const AuthContext = createContext(null);

const USERS_KEY = 'ecommerce_users';
const SESSION_KEY = 'ecommerce_session';

// --- Helpers for localStorage "database" ---
const loadUsers = () => {
  const stored = localStorage.getItem(USERS_KEY);
  if (stored) return JSON.parse(stored);
  // First run: seed with mock users
  localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
  return mockUsers;
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const loadSession = () => {
  const stored = localStorage.getItem(SESSION_KEY);
  return stored ? JSON.parse(stored) : null;
};

const saveSession = (user) => {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_KEY);
};

// --- Simulate network delay so loading states are visible ---
const delay = (ms = 700) => new Promise((res) => setTimeout(res, ms));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // On app load: restore session + seed users
  useEffect(() => {
    loadUsers();
    const session = loadSession();
    if (session) setUser(session);
    setInitializing(false);
  }, []);

  const register = async ({ firstName, middleName, lastName, email, password }) => {
    setLoading(true);
    await delay();

    const users = loadUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
      setLoading(false);
      throw new Error('An account with this email already exists');
    }

    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      firstName,
      middleName: middleName || '',
      lastName,
      email,
      password, // NOTE: plain text for Phase 1 only
      phone: '',
      address: '',
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);

    // Auto-login after register
    const { password: _pw, ...safeUser } = newUser;
    saveSession(safeUser);
    setUser(safeUser);
    setLoading(false);

    return safeUser;
  };

  const login = async (email, password) => {
    setLoading(true);
    await delay();

    const users = loadUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!found) {
      setLoading(false);
      throw new Error('No account found with that email');
    }

    if (found.password !== password) {
      setLoading(false);
      throw new Error('Incorrect password');
    }

    const { password: _pw, ...safeUser } = found;
    saveSession(safeUser);
    setUser(safeUser);
    setLoading(false);

    return safeUser;
  };

  const logout = () => {
    saveSession(null);
    setUser(null);
  };

  const updateProfile = async (updates) => {
    setLoading(true);
    await delay();

    const users = loadUsers();
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, ...updates } : u
    );
    saveUsers(updatedUsers);

    const updatedUser = { ...user, ...updates };
    saveSession(updatedUser);
    setUser(updatedUser);
    setLoading(false);

    return updatedUser;
  };

  const value = {
    user,
    loading,
    initializing,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}