import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const Home = lazy(() => import("./pages/homepage/Home.js"));
import TopHeader from "./components/topHeader/TopHeader.js";
import Login from "./pages/login/Login.js";
import Register from "./pages/register/Register.js";
import { ToastContainer } from "react-toastify";
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage.jsx"));
const ProductDetails = lazy(() => import("./pages/homepage/ProductDetails.js"));
const Product = lazy(() => import("./pages/product/Product.jsx"));
import WishList from "./pages/cart/cartDetails/WishList.jsx";
import UpdateProduct from "./pages/product/UpdateProduct.jsx";
import CartDetails from "./pages/cart/cartDetails/CartDetails.jsx";
import Search from "./pages/homepage/Search.jsx";
import ContactUs from "./pages/homepage/ContactUs.jsx";
import Checkout from "./pages/cart/cartDetails/Checkout.jsx";
import Khalti from "./components/khalti/Khalti.js";
import Review from "./pages/homepage/Review.jsx";
import MainLayout from "./components/admin/mainLayout/MainLayout.jsx";
import AdminProductList from "./components/admin/productsList/AdminProductList.jsx";
import Footer from "./components/footer/Footer.jsx";
import AllUserList from "./components/admin/userList/AllUserList.jsx";
import { lazy, Suspense, useEffect, useState } from "react";
import SkeletonLoading from "./components/layout/skeletonLoading/SkeletonLoading.jsx";
import PrivateRoute from "./components/layout/privateRoute/PrivateRoute.jsx";
import DashBoard from "./components/admin/dashboardGrid/DashBoard.jsx";
import SingleUserData from "./components/admin/singleUserData/SingleUserData.jsx";
import OrderSuccess from "./components/orderSuccess/OrderSuccess.jsx";
import PageNotFound from "./components/pageNotFound/PageNotFound.jsx";

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin_dashboard");
  const user = JSON.parse(localStorage.getItem("user"));

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
          <Route path="*" element={<PageNotFound />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/check-out" element={<Checkout />} />
          <Route path="/khalti" element={<Khalti />} />
          <Route path="/review/:productId" element={<Review />} />
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
