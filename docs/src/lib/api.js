// src/lib/api.js
// Axios instance configured to talk to our Express backend.
// All API calls in the app go through this, so we only configure it once.

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,    // IMPORTANT: sends cookies (JWT token) with every request
  timeout: 30000,           // 30 seconds timeout
  headers: { 'Content-Type': 'application/json' }
});

// Response interceptor: if the server returns 401 (unauthorized), redirect to login
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Don't redirect if we're already on auth pages
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
