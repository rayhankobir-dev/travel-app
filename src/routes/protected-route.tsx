/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/PrivateRoute.js
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  const { user }: any = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
