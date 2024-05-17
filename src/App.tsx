/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import AppRoutes from "@/routes";
import useAuth from "./hooks/useAuth";
import SpinerLoading from "./components/ui/spinner-loading";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { authAxios } from "./api";

function App() {
  const [loading, setLoading] = useState(true);
  const { setUser }: any = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        authAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [setUser]);
  return loading ? <FullPageLoader /> : <AppRoutes />;
}

export default App;

function FullPageLoader() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <SpinerLoading size={30} className="text-orange-600" />
    </div>
  );
}
