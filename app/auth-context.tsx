'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userId: string, userName: string) => void;
  logout: () => void;
  isHydrated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    // Check BOTH possible keys to clear old data
    const storedUser = localStorage.getItem('acosaUser') || localStorage.getItem('acosa-user');
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUser({ id: userData.studentId || userData.id, name: userData.name });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('acosaUser');
        localStorage.removeItem('acosa-user');
      }
    }
    
    setIsHydrated(true);
  }, []);

  const login = (userId: string, userName: string) => {
    const userData: User = { id: userId, name: userName };
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('acosaUser', JSON.stringify({ studentId: userId, name: userName }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('acosaUser');
    localStorage.removeItem('acosa-user');
    sessionStorage.removeItem('acosaUser');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isHydrated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}