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

const getAuthConfig = () => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Handle API Errors
const handleApiError = (error) => {
  if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
  } else if (error.request) {
    console.error("Request data:", error.request);
  } else {
    console.error("Error message:", error.message);
  }
  console.error("Config:", error.config);
  throw error; // Rethrow the error for further handling
};

// Test API
export const testAPI = () => Api.get("/test").catch(handleApiError);

// Register API
export const registerUserApi = (data) =>
  Api.post("/api/user/create", data).catch(handleApiError);

// Login API
export const loginUserApi = (data) =>
  Api.post("/api/user/login", data).catch(handleApiError);

// Create Product API
export const createProductApi = (data) =>
  Api.post("/api/product/create", data).catch(handleApiError);

export const addRatingReview = (data) => {
  const url = `/api/product/add/reviews`;
  const config = getAuthConfig();

  return Api.put(url, data, config).catch(handleApiError);
};

// Get Single Product Details

export const getAllReviews = (id) =>
  Api.get(`/api/product/getReviews?id=${id}`).catch(handleApiError);
export const singleProductDetails = (id) =>
  Api.get(`/api/product/single-productDetail/${id}`).catch(handleApiError);

// Get All Products API
export const getAllProducts = () =>
  Api.get("/api/product/get_all_products", config).catch(handleApiError);
export const getAllUsers = () =>
  Api.get("/api/user/all-adminUsers", config).catch(handleApiError);

export const getSingleUser = (id) =>
  Api.get(`/api/user/single-user/${id}`, config).catch(handleApiError);

// Get Single Product API
export const getSingleProductApi = (id) =>
  Api.get(`/api/product/get_single_product/${id}`, config).catch(
    handleApiError
  );

// Delete Product API
export const deleteProduct = (id) =>
  Api.delete(`/api/product/delete-product/${id}`).catch(handleApiError);

// Update Product API
export const updateProduct = (id, data) =>
  Api.put(`/api/product/update_product/${id}`, data, config).catch(
    handleApiError
  );

// Get All Categories API
export const getAllCategory = () =>
  Api.get("/api/category/get_all_categories").catch(handleApiError);

// Paginated Products API
export const getPaginatedProductsApi = (page, limit) =>
  Api.get(`/api/product/pagination?page=${page}&limit=${limit}`).catch(
    handleApiError
  );

// Create Cart API

// Add Item to Cart
export const addToCartApi = (data) =>
  Api.post("/api/cart/add", data, config).catch(handleApiError);

// Get Cart Items
export const getCartItems = () =>
  Api.get("/api/cart/get_cart_items", config).catch(handleApiError);

// Get Cart Items by User
export const getCartItemsApi = (userId) =>
  Api.get(`/api/cart/get_cart_items?userId=${userId}`, config).catch(
    handleApiError
  );

// Review and Ratings
export const getReviewsApi = (productId) =>
  Api.get(`/api/reviews/${productId}`).catch(handleApiError);
export const submitReviewApi = (data) =>
  Api.post("/api/reviews", data, config).catch(handleApiError);

// import axios from "axios";

// // Creating Backend Config
// const Api = axios.create({
//   baseURL: "http://localhost:3001",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json", // Changed to application/json unless you need multipart/form-data
//   },
// });

// const getAuthConfig = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

// // Handle API Errors
// const handleApiError = (error) => {
//   if (error.response) {
//     console.error("Response data:", error.response.data);
//     console.error("Response status:", error.response.status);
//     console.error("Response headers:", error.response.headers);
//   } else if (error.request) {
//     console.error("Request data:", error.request);
//   } else {
//     console.error("Error message:", error.message);
//   }
//   console.error("Config:", error.config);
//   throw error; // Rethrow the error for further handling
// };

// // Test API
// export const testAPI = () => Api.get("/test").catch(handleApiError);

// // Register API
// export const registerUserApi = (data) => Api.post("/api/user/create", data).catch(handleApiError);

// // Login API
// export const loginUserApi = (data) => Api.post("/api/user/login", data).catch(handleApiError);

// // Create Product API
// export const createProductApi = (data) => Api.post("/api/product/create", data).catch(handleApiError);

// // Get Single Product Details
// export const singleProductDetails = (id) => Api.get(`/api/product/single-productDetail/${id}`).catch(handleApiError);

// // Get All Products API
// export const getAllProducts = () => Api.get("/api/product/get_all_products", getAuthConfig()).catch(handleApiError);

// // Get Single Product API
// export const getSingleProductApi = (id) => Api.get(`/api/product/get_single_product/${id}`, getAuthConfig()).catch(handleApiError);

// // Delete Product API
// export const deleteProduct = (id) => Api.delete(`/api/product/delete-product/${id}`).catch(handleApiError);

// // Update Product API
// export const updateProduct = (id, data) => Api.put(`/api/product/update_product/${id}`, data, getAuthConfig()).catch(handleApiError);

// // Get All Categories API
// export const getAllCategory = () => Api.get("/api/category/get_all_categories").catch(handleApiError);

// // Paginated Products API
// export const getPaginatedProductsApi = (page, limit) => Api.get(`/api/product/pagination?page=${page}&limit=${limit}`).catch(handleApiError);

// // Add Item to Cart
// export const addToCartApi = (data) => Api.post("/api/cart/add", data, getAuthConfig()).catch(handleApiError);

// // Get Cart Items
// export const getCartItems = () => Api.get("/api/cart/get_cart_items", getAuthConfig()).catch(handleApiError);

// // Get Cart Items by User
// export const getCartItemsApi = (userId) => Api.get(`/api/cart/get_cart_items?userId=${userId}`, getAuthConfig()).catch(handleApiError);

// // Review and Ratings
// export const getReviewsApi = (productId) => Api.get(`/api/reviews/${productId}`).catch(handleApiError);
// export const submitReviewApi = (data) => Api.post("/api/reviews", data, getAuthConfig()).catch(handleApiError);
