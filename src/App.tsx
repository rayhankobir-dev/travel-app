/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import AppRoutes from "@/routes";
import useAuth from "./hooks/useAuth";
import SpinerLoading from "./components/ui/spinner-loading";
import { useEffect, useState } from "react";
import { authAxios } from "./api";

function App() {
  const [loading, setLoading] = useState(true);
  const { setUser }: any = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchProfile = async () => {
        try {
          authAxios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
          const res = await authAxios.get("/user/profile");
          setUser(res.data.data.user);
        } catch (error) {
          console.log(error);
          localStorage.removeItem("token");
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
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
