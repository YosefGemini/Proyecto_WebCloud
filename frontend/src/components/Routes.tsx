import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Products from "../pages/Products";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about_us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}
