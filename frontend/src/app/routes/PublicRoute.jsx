import { Navigate, Outlet } from "react-router";
import { getAuthSession } from "../../features/auth/services/auth.storage";

const PublicRoute = () => {
  const authSession = getAuthSession();

  if (authSession?.username) {
    return <Navigate to="/dashboard/links" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
