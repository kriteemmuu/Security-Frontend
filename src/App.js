import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { lazy, Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Lazy-loaded components
const Home = lazy(() => import("./pages/homepage/Home.js"));
const VerifyAccount =lazy(()=>import("./components/verifyAccount/VerifyAccount.js"))
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage.jsx"));
const ProductDetails = lazy(() => import("./pages/homepage/ProductDetails.js"));
const Product = lazy(() => import("./pages/product/Product.jsx"));
const TopHeader = lazy(() => import("./components/topHeader/TopHeader.js"));
const Login =lazy(()=>import("./pages/login/Login.js"));
const Register = lazy(() => import("./pages/register/Register.js"));
const WishList = lazy(() => import("./pages/cart/cartDetails/WishList.jsx"));
const UpdateProduct = lazy(() => import("./pages/product/UpdateProduct.jsx"));
const CartDetails = lazy(() => import("./pages/cart/cartDetails/CartDetails.jsx"));
const Search = lazy(() => import("./pages/homepage/Search.jsx"));
const ContactUs = lazy(() => import("./pages/homepage/ContactUs.jsx"));
const Checkout = lazy(() => import("./pages/cart/cartDetails/Checkout.jsx"));
const Khalti = lazy(() => import("./components/khalti/Khalti.js"));
const Review = lazy(() => import("./pages/homepage/Review.jsx"));
const MainLayout = lazy(() => import("./components/admin/mainLayout/MainLayout.jsx"));
const AdminProductList = lazy(() => import("./components/admin/productsList/AdminProductList.jsx"));
const Footer = lazy(() => import("./components/footer/Footer.jsx"));
const AllUserList = lazy(() => import("./components/admin/userList/AllUserList.jsx"));
const SkeletonLoading = lazy(() => import("./components/layout/skeletonLoading/SkeletonLoading.jsx"));
const PrivateRoute = lazy(() => import("./components/layout/privateRoute/PrivateRoute.jsx"));
const DashBoard = lazy(() => import("./components/admin/dashboardGrid/DashBoard.jsx"));
const SingleUserData = lazy(() => import("./components/admin/singleUserData/SingleUserData.jsx"));
const OrderSuccess = lazy(() => import("./components/orderSuccess/OrderSuccess.jsx"));
const PageNotFound = lazy(() => import("./components/pageNotFound/PageNotFound.jsx"));
const OrderHistory = lazy(() => import("./components/orderHistory/OrderHistory.jsx"));
const SingleOrderHistory = lazy(() => import("./components/singleOrderHistory/SingleOrderHistory.jsx"));
const AdminOrderList = lazy(() => import("./components/admin/adminOrderList/AdminOrderList.jsx"));
const AdminSingleOrder = lazy(() => import("./components/admin/adminOrderList/adminSingleOrder/AdminSingleOrder.jsx"));
const AboutUs = lazy(() => import("./pages/findUs/AboutUs.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/findUs/PrivacyPolicy.jsx"));
const LegalNotice = lazy(() => import("./pages/findUs/LegalNotice.jsx"));
const TermsAndConditions = lazy(() => import("./pages/findUs/TermsAndConditions.jsx"));


const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin_dashboard");
  const user = localStorage.getItem("user") 
  ? JSON.parse(localStorage.getItem("user")) 
  : {};


  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemsCount(cart.length);
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemsCount(cart.length);
  };

  return (
    <>
      {!isAdminRoute && <TopHeader cartItemsCount={cartItemsCount} />}
      <Suspense fallback={<SkeletonLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/product-details/:id"
            element={<ProductDetails updateCartCount={updateCartCount} />}
          />
          <Route path="/cart-details" element={<CartDetails />} />
          <Route path="/wishlist" element={<WishList />} />


          {/* //AdminPanel */}
          <Route
            path="/admin_dashboard/*"
            element={
              <PrivateRoute userRole={user?.role === "admin"}>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route path="all-productsList" element={<AdminProductList />} />
            <Route path="all-orderList" element={<AdminOrderList />} />
            <Route
              path="admin-single-order/:id"
              element={<AdminSingleOrder />}
            />
            <Route path="single-userData/:id" element={<SingleUserData />} />
            <Route path="admin-dashboard-stats" element={<DashBoard />} />
            <Route path="all-usersList" element={<AllUserList />} />
            <Route path="add/product" element={<Product />} />
            <Route
              path="admin/update/product/:id"
              element={<UpdateProduct />}
            />
          </Route>

          <Route path="/search" element={<Search />} />
          {/* <Route path="/verify-account" element={<VerifyAccount />} /> */}

          <Route path="*" element={<PageNotFound />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route
            path="/user-order-history"
            element={
              <PrivateRoute>
                <OrderHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/single-order/:id"
            element={
              <PrivateRoute>
                <SingleOrderHistory />
              </PrivateRoute>
            }
          />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route
            path="/check-out"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path="/khalti" element={<Khalti />} />
          <Route path="/verify-account" element={<VerifyAccount />} />

          <Route path="/review/:productId" element={<Review />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />       
        </Routes>
      </Suspense>
      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <ToastContainer />
      <AppContent />
    </Router>
  );
}

export default App;
