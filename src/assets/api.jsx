import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cma-523a.onrender.com/api', // Dynamically loaded from the environment
})

// Interceptor to add token to headers for every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config; // Return the config to continue the request
  },
  (error) => {
    return Promise.reject(error); // Handle any errors in the request
  }
);

export default api;
