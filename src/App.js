import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/homepage/Home.js";
import TopHeader from "./components/topHeader/TopHeader.js";
import Login from "./pages/login/Login.js";
import Register from "./pages/register/Register.js";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import ProductDetails from "./pages/homepage/ProductDetails.js";
import AdminDashboard from "./pages/admin_dashboard/AdminDashboard.js";
import Product from "./pages/product/Product.jsx";
import WishList from "./pages/cart/cartDetails/WishList.jsx";
import UpdateProduct from "./pages/product/UpdateProduct.jsx";
import CartDetails from "./pages/cart/cartDetails/CartDetails.jsx";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <TopHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart-details" element={<CartDetails />} />
          <Route path="/wishlist" element={<WishList />} /> {/* Wishlist route */}
          <Route path="/admin_dashboard" element={<AdminDashboard />} />
          <Route path="/add/product" element={<Product />} />
          <Route path="/admin/update/product/:id" element={<UpdateProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
