import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    if (email === 'admin@brutalmotors.com' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        name: 'Admin User',
        email: 'admin@brutalmotors.com',
        phone: '+1234567890',
        isAdmin: true,
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      setIsLoading(false);
      return true;
    } else if (email === 'user@example.com' && password === 'user123') {
      const regularUser: User = {
        id: '2',
        name: 'John Doe',
        email: 'user@example.com',
        phone: '+1234567891',
        isAdmin: false,
      };
      setUser(regularUser);
      localStorage.setItem('user', JSON.stringify(regularUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const googleUser: User = {
      id: '3',
      name: 'Google User',
      email: 'google@example.com',
      phone: '+1234567892',
      isAdmin: false,
    };
    
    setUser(googleUser);
    localStorage.setItem('user', JSON.stringify(googleUser));
    setIsLoading(false);
    return true;
  };

  const loginWithPhone = async (phone: string, code: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate SMS verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (code === '123456') {
      const phoneUser: User = {
        id: '4',
        name: 'Phone User',
        email: '',
        phone: phone,
        isAdmin: false,
      };
      
      setUser(phoneUser);
      localStorage.setItem('user', JSON.stringify(phoneUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: Omit<User, 'id' | 'isAdmin'> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      isAdmin: false,
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    login,
    loginWithGoogle,
    loginWithPhone,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
