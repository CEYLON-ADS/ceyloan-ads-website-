// services/api.ts
import axios from 'axios';
import { getToken } from '../services/verifyOTP.ts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Clear auth data on unauthorized access
            localStorage.removeItem('authToken');
            sessionStorage.removeItem('authToken');
            if (window.location.pathname !== '/loginpage') {
                window.location.href = '/loginpage';
            }
        }
        return Promise.reject(error);
    }
);

export default api;