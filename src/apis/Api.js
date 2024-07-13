// import axios from "axios";

// // Configure the base URL for the axios instance
// const Api = axios.create({
//   baseURL: "http://localhost:3001",
// });

// // Function to handle errors from API requests
// const handleApiError = (error) => {
//   if (error.response) {
//     // The server responded with a status code outside the range of 2xx
//     console.error("Response data:", error.response.data);
//     console.error("Response status:", error.response.status);
//     console.error("Response headers:", error.response.headers);
//   } else if (error.request) {
//     // The request was made but no response was received
//     console.error("Request data:", error.request);
//   } else {
//     // An error occurred in setting up the request
//     console.error("Error message:", error.message);
//   }
//   console.error("Config:", error.config);
//   throw error; // Rethrow the error for further handling
// };

// // Function to test API connectivity
// export const testApi = () => Api.get("/test").catch(handleApiError);

// // Function to register a new user
// export const registerUserApi = (data) =>
//   Api.post("/api/user/create", data).catch(handleApiError);

// // Function to log in a user
// export const loginUserApi = (data) =>
//   Api.post("/api/user/login", data).catch(handleApiError);

// export const getAllProducts=(id)=>Api.get(`/api/product/get_single_product/${id}`)

// export const createProductApi=(data)=>Api.post('/api/product/create',data)

// export const deleteProduct=(id)=>Api.delete(`/api/product/delete_product/${id}`)

// // Update Product API
// export const updateProduct = (id, data) =>
//   Api.put(`/api/product/update_product/${id}`, data);

// // Get All Categories API
// export const getAllCategory = () => Api.get("/api/category/get_all_categories");

// // export const getSingleProductApi = (id) =>
// //   Api.get(`/api/product/get_single_product/${id}`);

import axios from "axios";

// Creating Backend Config
const Api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

// Test API
export const testAPI = () => Api.get("/test");

// Register API
export const registerUserApi = (data) => Api.post("/api/user/create", data);

// Login API
export const loginUserApi = (data) => Api.post("/api/user/login", data);

// Create Product API
export const createProductApi = (data) =>
  Api.post("/api/product/create",  data);

export const getAllHomeProducts = () => Api.get("/api/product/allProducts");
export const singleProductDetails = (id) =>
  Api.get(`/api/product/single-productDetail/${id}`);

// Get All Products API
export const getAllProducts = () =>
  Api.get("/api/product/get_all_products", config);

// Get Single Product API
export const getSingleProductApi = (id) =>
  Api.get(`/api/product/get_single_product/${id}`, config);

// Delete Product API
export const deleteProduct = (id) =>
  Api.delete(`/api/product/delete-product/${id}`);

// Update Product API
export const updateProduct = (id, data, config) =>
  Api.put(`/api/product/update_product/${id}`, data, config);

// Get All Categories API
export const getAllCategory = () => Api.get("/api/category/get_all_categories");

// Paginated Products API
export const getPaginatedProductsApi = (page, limit) =>
  Api.get(`/api/product/pagination?page=${page}&limit=${limit}`);

// Create Cart API

// Add Item to Cart
export const addToCartApi = (data) => Api.post("/api/cart/add", data, config);

// Get Cart Items
export const getCartItems = () => Api.get("/api/cart/get_cart_items", config);

// Get Cart Items by User
export const getCartItemsApi = (userId) =>
  Api.get(`/api/cart/get_cart_items?userId=${userId}`, config);
