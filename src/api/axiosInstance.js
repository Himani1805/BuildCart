import axios from 'axios';

// Creating a centralized instance of Axios with default configurations
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Our mock json-server endpoint
  timeout: 10000, // Request aborts if server does not respond in 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically injects Auth Token into every outgoing request
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieving token from localStorage stored during login
    const token = localStorage.getItem('buildcart_token');
    
    // If token exists, append it to the Authorization headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response Interceptor: Handles global API error statuses in one place
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the clean data directly if the response is successful
    return response;
  },
  (error) => {
    // Centralized error handling based on HTTP status codes
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized access - clear data and force logout if needed
          localStorage.removeItem('buildcart_token');
          break;
        case 404:
          console.error('Resource not found on the server.');
          break;
        case 500:
          console.error('Internal Server Error. Please try again later.');
          break;
        default:
          console.error('An unexpected error occurred:', error.response.data);
      }
    } else if (error.request) {
      // The request was made but no response was received (Network Error)
      console.error('Network Error: Please check if your mock server is running.');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;