import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Products from "../pages/Products";
import JWT from "./layout/JWT";
import ProductPage from "../pages/product/Product";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Navigate to="/home" /> } />
        <Route path="/home" element={<JWT><Home /></JWT>} />
        <Route path="/products" element={<JWT><Products /></JWT>} />
        <Route path="/products/:id" element={<JWT><ProductPage /></JWT>} />
        <Route path="/about_us" element={<JWT><AboutUs /></JWT>} />
      </Routes>
    </Router>
  );
}
