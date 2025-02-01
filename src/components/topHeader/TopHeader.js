import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Badge,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaSearch, FaPhoneAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import {jwtDecode} from "jwt-decode";
import { startTransition } from "react";

const TopHeader = ({ cartItemsCount }) => {
  const navigate = useNavigate();
  const [wishlistCount, setWishlistCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token");


  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(wishlist.length);
    };

    updateWishlistCount();
    window.addEventListener("storage", updateWishlistCount);
    return () => window.removeEventListener("storage", updateWishlistCount);
  }, []);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("cart");
            localStorage.removeItem("wishlist");
          
            toast.success("Session expired. Please log in again.");
            navigate("/login");
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("cart");
          localStorage.removeItem("wishlist");
   
          toast.success("Session expired. Please log in again.");
          navigate("/login");
        }
      }
    };
  
    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(interval);
  }, [navigate,token]);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
  
    startTransition(() => {
  
      navigate("/login");
    });
  
    toast.success("Logout successfully! Please log in again.");
  };

  const handleGoToSearch = () => {
    navigate("/search");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/assets/images/bump.png"
            alt="DivImg"
            style={{ height: "auto", marginRight: "10px", width: "50px" }}
          />
          Diva <span style={{ color: "purple" }}>Maternity Store</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/contact-us">
              <FaPhoneAlt className="mr-1" /> Contact
            </Nav.Link>
          </Nav>
          <Button
            variant="outline-secondary"
            onClick={handleGoToSearch}
            className="mx-2"
          >
            <FaSearch />
          </Button>
          <Nav className="d-flex align-items-center">
            <Nav.Link
              as={Link}
              to="/wishlist"
              className="position-relative mx-2"
            >
              <FaHeart />
              <Badge
                pill
                bg="danger"
                style={{ position: "absolute", top: "-5px", right: "-10px" }}
              >
                {wishlistCount}
              </Badge>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cart-details"
              className="position-relative mx-3"
            >
              <FaShoppingCart />
              <Badge
                pill
                bg="danger"
                style={{ position: "absolute", top: "-5px", right: "-10px" }}
              >
                {cartItemsCount || 0}
              </Badge>
            </Nav.Link>
          </Nav>
          {!user ? (
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
          ) : (
            <NavDropdown
              title={`Welcome, ${user?.firstName}!`}
              id="basic-nav-dropdown"
              className="ml-3"
            >
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/user-order-history">
                My Orders
              </NavDropdown.Item>
              {user?.role === "admin" && (
                <NavDropdown.Item as={Link} to="/admin_dashboard">
                  Dashboard
                </NavDropdown.Item>
              )}
              <NavDropdown.Item as={Link} to="#">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

TopHeader.propTypes = {
  cartItemsCount: PropTypes.number.isRequired,
};

export default TopHeader;