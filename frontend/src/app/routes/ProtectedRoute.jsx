import { Navigate, Outlet, useLocation } from "react-router";
import { isAuthenticated } from "../../features/auth/services/auth.storage";

const ProtectedRoute = () => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
