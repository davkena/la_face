// utils/auth.js
import axiosInstance from './axiosInstance';

export const login = async (username, password) => {
  const response = await axiosInstance.post('/login/', { username, password });
  if (response.status === 200) {
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post('/register/', userData);
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getAccessToken = () => localStorage.getItem('access_token');