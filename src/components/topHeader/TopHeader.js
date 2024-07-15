// import { Navbar, Nav, NavDropdown, Container, Badge } from "react-bootstrap";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useEffect, useState } from "react";
// import { FaHeart, FaShoppingCart } from "react-icons/fa";

// const TopHeader = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
//   const [cart] = useState(initialCart);

//   const location = useLocation();

//   const isAuthPage =
//     location.pathname === "/login" || location.pathname === "/register";

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("cart");

//     toast.success("Successfully logged out");
//     navigate("/login");
//   };

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   return (
//     <Navbar bg="light" expand="lg">
//       <Container>
//         <Navbar.Brand as={Link} to="/">
//           <img
//             src="/assets/images/baby.png"
//             alt=""
//             style={{ height: "30px", marginRight: "10px" }}
//           />
//           Diva <span style={{ color: "purple" }}>Maternity Store</span>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/">
//               Home
//             </Nav.Link>
//           </Nav>

//           <Nav className="d-flex align-items-center">
//             <Nav.Link as={Link} to="/wishlist" className="position-relative">
//               <FaHeart />

//               <Badge
//                 pill
//                 bg="danger"
//                 style={{ position: "absolute", top: "-5px", right: "-10px" }}
//               >
//                 0
//               </Badge>
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/cart-details"
//               className="position-relative mx-3"
//             >
//               <FaShoppingCart />
//               <Badge
//                 pill
//                 bg="danger"
//                 style={{ position: "absolute", top: "-5px", right: "-10px" }}
//               >
//                 {initialCart.length}
//               </Badge>
//             </Nav.Link>
//           </Nav>

//           {!user && !isAuthPage && (
//             <Nav>
//               <Nav.Link as={Link} to="/login" className="btn btn-primary">
//                 Login
//               </Nav.Link>
//             </Nav>
//           )}
//           {user && (
//             <NavDropdown
//               title={`Welcome, ${user?.firstName}!`}
//               id="basic-nav-dropdown"
//             >
//               <NavDropdown.Item as={Link} to="/profile">
//                 Profile
//               </NavDropdown.Item>
//               {user && user?.role === "admin" ? (
//                 <NavDropdown.Item as={Link} to="/admin_dashboard">
//                   dashboard
//                 </NavDropdown.Item>
//               ) : (
//                 ""
//               )}
//               <NavDropdown.Item as={Link} to="#">
//                 Settings
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
//             </NavDropdown>
//           )}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default TopHeader;

import { Navbar, Nav, NavDropdown, Container, Badge } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const TopHeader = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart] = useState(initialCart);
  const [wishlistCount, setWishlistCount] = useState(0);
  

  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    // Update cart in localStorage if it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    // Function to update wishlist count from localStorage
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(wishlist.length);
    };

    updateWishlistCount();

    // Optional: Listen to storage events to update wishlist count across tabs
    window.addEventListener('storage', updateWishlistCount);
    return () => window.removeEventListener('storage', updateWishlistCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");

    toast.success("Successfully logged out");
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="/assets/images/baby.png" alt="" style={{ height: "30px", marginRight: "10px" }} />
          Diva <span style={{ color: "purple" }}>Maternity Store</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center">
            <Nav.Link as={Link} to="/wishlist" className="position-relative">
              <FaHeart />
              <Badge pill bg="danger" style={{ position: "absolute", top: "-5px", right: "-10px" }}>
                {wishlistCount}
              </Badge>
            </Nav.Link>
            <Nav.Link as={Link} to="/cart-details" className="position-relative mx-3">
              <FaShoppingCart />
              <Badge pill bg="danger" style={{ position: "absolute", top: "-5px", right: "-10px" }}>
                {cart.length}
              </Badge>
            </Nav.Link>
          </Nav>
          {!user && !isAuthPage && (
            <Nav>
              <Nav.Link as={Link} to="/login" className="btn btn-primary">
                Login
              </Nav.Link>
            </Nav>
          )}
          {user && (
            <NavDropdown title={`Welcome, ${user?.firstName}!`} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              {user?.role === "admin" && <NavDropdown.Item as={Link} to="/admin_dashboard">Dashboard</NavDropdown.Item>}
              <NavDropdown.Item as={Link} to="#">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopHeader;

