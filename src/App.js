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
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
