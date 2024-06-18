import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const TopHeader = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Function to handle logout
 const handleLogout = () => {
  localStorage.removeItem("user");
  toast.success("Successfully logged out");
  navigate("/login");
};

  useEffect(() => {
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
    dropdownToggles.forEach((dropdownToggle) => {
      dropdownToggle.addEventListener("click", function () {
        this.classList.toggle("show");
        const dropdownMenu = this.nextElementSibling;
        if (dropdownMenu) {
          dropdownMenu.classList.toggle("show");
        }
      });
    });
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">
          <img
            src="/assets/images/baby.png"
            alt="Logo"
            style={{ height: "30px", marginRight: "10px" }}
          />
          Diva <span style={{ color: "red" }}>Maternity</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Link</Nav.Link>
          </Nav>
          {!user && !isAuthPage && (
            <Nav>
              <Nav.Link as={Link} to="/login" className="btn btn-primary">
                Login
              </Nav.Link>
            </Nav>
          )}
          {user && (
            <NavDropdown
              title={`Welcome, ${user?.firstName}!`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
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

export default TopHeader;
