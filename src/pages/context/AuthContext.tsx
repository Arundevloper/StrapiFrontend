import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define a more specific user type according to your API response
interface User {
  id: string;
  email: string;
  // Add other relevant fields based on your user object
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean; // Add loading state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch the user info if the token is present
      axios.get('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem('token'); // Clear invalid token
        setUser(null); // Ensure user is set to null if there's an error
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the fetch
      });
    } else {
      setLoading(false); // Set loading to false if there's no token
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password,
      });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.jwt);
    } catch (error) {
      console.error('Login failed:', error);
      // You can throw an error or set some error state here if needed
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
