
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'provider' | 'admin';
  isApproved: boolean;
  profile: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  register: (userData: any) => Promise<any>;
  verifyOTP: (email: string, otp: string) => Promise<any>;
  logout: () => void;
  loading: boolean;
  updateUser: (userData: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      const { token: newToken, user: userData } = response.data;

      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      const response = await authAPI.verifyOTP(email, otp);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateUser = (userData: any) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token,
    login,
    register,
    verifyOTP,
    logout,
    loading,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
