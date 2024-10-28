// src/routes/PublicRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";

const PublicRoute = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
