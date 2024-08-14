import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { FaBox, FaUsers, FaList, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineDashboardCustomize, MdOutlineSettings } from "react-icons/md";

const SideBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="bg-dark text-white vh-100">
        <div className="p-4">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 className="text-white mb-4">Diva Maternity</h1>
          </Link>
          <Nav className="flex-column">
            <Nav.Item className="mb-3">
              <Link
                to="/admin_dashboard/admin-dashboard-stats"
                className="text-white d-flex align-items-center text-decoration-none"
              >
                <MdOutlineDashboardCustomize className="me-2" />
                Dashboard
              </Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
              <Link
                to="/admin_dashboard/all-productsList"
                className="text-white d-flex align-items-center text-decoration-none"
              >
                <FaList className="me-2" />
                Product List
              </Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
              <Link
                to="/admin_dashboard/all-usersList"
                className="text-white d-flex align-items-center text-decoration-none"
              >
                <FaUsers className="me-2" />
                User List
              </Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
              <Link
                to="/admin_dashboard/all-orderList"
                className="text-white d-flex align-items-center text-decoration-none"
              >
                <FaBox className="me-2" />
                Order List
              </Link>
            </Nav.Item>
            <Nav.Item className="mb-3">
              <Link
                to={"#"}
                className="text-white d-flex align-items-center text-decoration-none"
              >
                <MdOutlineSettings className="me-2" />
                Settings
              </Link>
            </Nav.Item>
            <Nav.Item className="mt-auto">
              <button
                onClick={handleLogout}
                className="text-white d-flex align-items-center bg-transparent border-0 p-0"
                style={{ cursor: "pointer" }}
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </>
  );
};

export default SideBar;
