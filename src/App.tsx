import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import MainLayout from "./components/layout/main-layout";
import List from "./pages/list";
import SingleTour from "./pages/tour";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Faq from "./pages/faq";
import PrivacyPolicy from "./pages/privacy-policy";

function App() {
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
      </Route>
    </Routes>
  );
}

export default App;
