import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import MainLayout from "./components/layout/main-layout";
import List from "./pages/list";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
      </Route>
    </Routes>
  );
}

export default App;
