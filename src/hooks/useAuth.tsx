import { AuthContext } from "@/context/authContext";
import { AuthContextType } from "@/types";
import { useContext } from "react";

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
