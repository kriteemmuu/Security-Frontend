import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ admin = false, children, userRole }) => {
  let token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (admin && userRole !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

// PropTypes validation
PrivateRoute.propTypes = {
  admin: PropTypes.bool,
  children: PropTypes.node,
  userRole: PropTypes.string,
};

export default PrivateRoute;
