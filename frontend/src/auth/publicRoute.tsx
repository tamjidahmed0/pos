import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export const PublicRoute = () => {
  const token = Cookies.get("access_token");
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
