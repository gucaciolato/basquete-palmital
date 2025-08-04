
import React, { createContext, useState, useEffect, useContext } from 'react';
import md5 from 'md5';

interface User {
  id: string;
  username: string;
  nome: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  hasPermission: () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage only once on mount
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('prestaContaUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('prestaContaUser');
      } finally {
        // Important: Mark loading as complete
        setIsLoading(false);
      }
    };
    
    // Load user immediately
    loadUserFromStorage();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Fetch the user data from the JSON file
      const response = await fetch('/data/usuarios.json');
      const users = await response.json();
      
      // Find the user
      const user = users.find((u: any) => 
        u.username === username && 
        u.passwordHash === md5(password) && 
        u.ativo
      );
      
      if (user) {
        const userData = {
          id: user.id,
          username: user.username,
          nome: user.nome,
          role: user.role
        };
        setUser(userData);
        localStorage.setItem('prestaContaUser', JSON.stringify(userData));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prestaContaUser');
  };

  const hasPermission = (role: string): boolean => {
    if (!user) return false;
    
    // Admin has all permissions
    if (user.role === 'admin') return true;
    
    // Check if user has the specific role
    return user.role === role;
  };

  // Memoize the context value to prevent unnecessary rerenders
  const authContextValue = React.useMemo(() => ({
    user, 
    isAuthenticated: !!user, 
    isLoading,
    login, 
    logout,
    hasPermission
  }), [user, isLoading]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
