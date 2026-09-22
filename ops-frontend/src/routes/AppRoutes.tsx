import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import SupplierPage from "../pages/SupplierPage";
import Customers from "../pages/Customers";
import Profile from "../pages/Profile";
import LoginPage from "../pages/LoginPage";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token);
  return token ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/suppliers" element={<SupplierPage />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact-us" element={<h2>Contact Us!!!!!</h2>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;