// src/apiClient.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/',    // e.g. "http://localhost:5000"
  headers: {
    'Content-Type': 'application/json'
  }
});

// (Later) if you add JWT auth:
// api.interceptors.request.use(cfg => {
//   const token = localStorage.getItem('token');
//   if (token) cfg.headers.Authorization = `Bearer ${token}`;
//   return cfg;
// });

export default api;