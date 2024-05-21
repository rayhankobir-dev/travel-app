/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import { authAxios } from "@/api";
import { JwtPayload } from "jwt-decode";
import toast from "react-hot-toast";

const AuthContext = createContext({});

const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<JwtPayload | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setLoading(true);
      const res = await authAxios.post("/auth/login", credentials);

      const { token, user } = res.data.data;
      localStorage.setItem("token", token);
      setUser(user);
      authAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    delete authAxios.defaults.headers.common["Authorization"];
    toast.success("You're logged out");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };