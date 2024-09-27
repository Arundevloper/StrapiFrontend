import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Define base URL for Strapi API
const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api/';
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

// Create axios instance with baseURL
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Interceptor to dynamically add the token only when needed
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Only add Authorization header if a token exists and if the request requires authentication
    if (TOKEN && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
