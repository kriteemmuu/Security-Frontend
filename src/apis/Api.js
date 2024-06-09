import axios from 'axios';

// Creating backend Config
const Api = axios.create({
  baseURL: 'http://localhost:5500',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json', // Use 'application/json' for login and registration
  },
});

// Error handling function
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code outside the range of 2xx
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Request data:', error.request);
  } else {
    // Something happened in setting up the request that triggered an error
    console.error('Error message:', error.message);
  }
  console.error('Config:', error.config);
  throw error;
};

// Test API
export const testApi = () =>
  Api.get('/test').catch(handleApiError);

// Register API
export const registerUserApi = (data) =>
  Api.post('/api/user/create', data).catch(handleApiError);

// Login API
export const loginUserApi = (data) =>
  Api.post('/api/user/login', data).catch(handleApiError);

