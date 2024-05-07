import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import MainLayout from "./components/layout/main-layout";
import List from "./pages/list";
import SingleTour from "./pages/tour";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/list/:id" element={<SingleTour />} />
      </Route>
    </Routes>
  );
}

export default App;
