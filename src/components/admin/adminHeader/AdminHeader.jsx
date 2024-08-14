import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <>
      <Navbar bg="white" variant="white" className="fixed-top">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link as={Link} to="/profile" className="text-white">
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/settings" className="text-white">
              Settings
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};

export default AdminHeader;
