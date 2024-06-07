// utils/auth.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('/api/user', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/login/', { username, password });
      localStorage.setItem('token', response.data.access);
      setUser(response.data.user);
      // Redirect based on user role
      if (response.data.user.role === 'super_admin') {
        router.push('/admin'); // Change this to your desired admin page
      } else {
        router.push('/dashboard'); // Change this to your desired user dashboard page
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
