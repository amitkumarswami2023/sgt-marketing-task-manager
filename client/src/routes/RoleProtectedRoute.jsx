import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleProtectedRoute = ({ roles = [], children }) => {
  const { user } = useSelector((state) => state.auth);
  console.log("User:", user);
  console.log("Current Role:", user?.role);
  console.log("Allowed Roles:", roles);
  console.log("Allowed?", roles.includes(user?.role));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/" replace />;

      case "team-lead":
        return <Navigate to="/teamlead" replace />;

      case "employee":
        return <Navigate to="/employee" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default RoleProtectedRoute;
