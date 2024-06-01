import { createContext, useState } from "react";
import { authAxios } from "@/api";
import toast from "react-hot-toast";
import { AuthContextType, ErrorResponse, LoginFormData, User } from "@/types";
import { extractErrorMessage } from "@/lib/lib";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: LoginFormData) => {
    try {
      setLoading(true);
      const res = await authAxios.post("/auth/login", credentials);

      const { token, user } = res.data.data;
      localStorage.setItem("token", token);
      setUser(user);
      authAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success(res.data.message);
    } catch (error) {
      toast.error(extractErrorMessage(error as ErrorResponse));
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
