import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/authContext.tsx";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

const helmetContext = {};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider context={helmetContext}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  </HelmetProvider>
);
