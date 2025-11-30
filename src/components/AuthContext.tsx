import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
  createdAt: Date;
  subscription?: 'free' | 'pro' | 'enterprise';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  joinWaitlist: (email: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      isAdmin: email === 'admin@funnelai.com',
      createdAt: new Date(),
      subscription: 'free'
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setLoading(false);
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      isAdmin: email === 'admin@funnelai.com',
      createdAt: new Date(),
      subscription: 'free'
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const joinWaitlist = async (email: string, name: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const waitlist = JSON.parse(localStorage.getItem('waitlist') || '[]');
    waitlist.push({ email, name, joinedAt: new Date() });
    localStorage.setItem('waitlist', JSON.stringify(waitlist));
  };

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser({
          ...parsed,
          createdAt: new Date(parsed.createdAt)
        });
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    joinWaitlist
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
