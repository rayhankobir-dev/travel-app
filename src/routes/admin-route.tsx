/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = () => {
  const { user }: any = useAuth();
  return user?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
