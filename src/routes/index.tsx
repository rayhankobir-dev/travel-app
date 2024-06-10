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
import Profile from "@/pages/profile";
import { PaymentSuccess } from "@/pages/payment-success";
import { PaymentFailed } from "@/pages/payment-fail";
import { PaymentCanceled } from "@/pages/payment-canceled";
import AdminSupport from "@/admin/pages/support";
import AdminLayout from "@/admin/layout/admin-layout";
import Dashboard from "@/admin/pages/home";
import AdminRoute from "./admin-route";
import Error404 from "@/admin/pages/404";
import Users from "@/admin/pages/admins";
import Customers from "@/admin/pages/customers";
import AllTrips from "@/admin/pages/all-trips";
import Bookings from "@/admin/pages/bookings";
import Faqs from "@/admin/pages/faqs";
import Activities from "@/admin/pages/activities";
import Highlights from "@/admin/pages/lightlisghts";
import Locations from "@/admin/pages/locations";
import Services from "@/admin/pages/services";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<Support />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/payment-canceled" element={<PaymentCanceled />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="admins" element={<Users />} />
          <Route path="customers" element={<Customers />} />
          <Route path="trips">
            <Route index element={<AllTrips />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="faqs" element={<Faqs />} />
            <Route path="highlights" element={<Highlights />} />
            <Route path="services" element={<Services />} />
            <Route path="locations" element={<Locations />} />
            <Route path="activities" element={<Activities />} />
          </Route>
          <Route path="support" element={<AdminSupport />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Route>
    </Routes>
  );
}
