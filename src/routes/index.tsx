import { Route, Routes } from "react-router-dom";
import MainLayout from "@/components/layout/main-layout";
import PrivateRoute from "./protected-route";
import Home from "@/pages/home";
import Signup from "@/pages/signup";
import Login from "@/pages/login";
import Support from "@/pages/support";
import Faq from "@/pages/faq";
import PrivacyPolicy from "@/pages/privacy-policy";
import List from "@/pages/tour-grid";
import SingleTour from "@/pages/tour-details";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/list" element={<List />} />
        <Route path="/list/:id" element={<SingleTour />} />
        <Route element={<PrivateRoute />}>
          <Route path="/support" element={<Support />} />
        </Route>
      </Route>
    </Routes>
  );
}
