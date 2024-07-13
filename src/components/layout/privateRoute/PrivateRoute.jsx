import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = ({ admin = false, userRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (admin && userRole !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

// PropTypes validation
PrivateRoute.propTypes = {
  admin: PropTypes.bool,
  userRole: PropTypes.string,
};

export default PrivateRoute;
