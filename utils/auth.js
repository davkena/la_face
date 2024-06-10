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
        .get('http://127.0.0.1:8000/user/', { headers: { Authorization: `Bearer ${token}` } })
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
      const response = await axios.post('http://127.0.0.1:8000/login/', { username, password });
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh); // Store refresh token
      localStorage.setItem('token', response.data.access);
      setUser(response.data.user);
      // Redirect based on user role
      if (response.data.user.role === 'super_admin') {
        router.push('/dashboard'); 
      } else {
        router.push('/'); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token'); // Get refresh token
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/logout/', { refresh: refreshToken }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token'); // Remove refresh token
      setUser(null);
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
