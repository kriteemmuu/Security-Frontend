import axios from "axios";

// Configure the base URL for the axios instance
const Api = axios.create({
  baseURL: "http://localhost:3001",
});

// Function to handle errors from API requests
const handleApiError = (error) => {
  if (error.response) {
    // The server responded with a status code outside the range of 2xx
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Request data:", error.request);
  } else {
    // An error occurred in setting up the request
    console.error("Error message:", error.message);
  }
  console.error("Config:", error.config);
  throw error; // Rethrow the error for further handling
};

// Function to test API connectivity
export const testApi = () => Api.get("/test").catch(handleApiError);

// Function to register a new user
export const registerUserApi = (data) =>
  Api.post("/api/user/create", data).catch(handleApiError);

// Function to log in a user
export const loginUserApi = (data) =>
  Api.post("/api/user/login", data).catch(handleApiError);

export const getAllProducts=(id)=>Api.get(`/api/product/get_single_prodct/${id}`)
  
export const createProductApi=(data)=>Api.post('/api/product/create',data)
export const deleteProduct=(id)=>Api.delete(`/api/product/delete_product/${id}`)
