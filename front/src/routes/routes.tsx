// src/routes/AppRoutes.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ServiceOrderForm from "../pages/CreateOrderForm";
import ServiceOrderAudio from "../pages/ServiceOrderAudio";
import ServiceOrderText from "../pages/ServiceOrderText";
import ProtectedRoutes from "../utils/routes/ProtectedRoutes";
import PublicRoute from "../utils/routes/PublicRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Rotas Protegidas */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/order-text" element={<ServiceOrderText />} />
        <Route path="/order-audio" element={<ServiceOrderAudio />} />
        <Route path="/order-create" element={<ServiceOrderForm />} />
      </Route>

      {/* Rota para lidar com URLs inexistentes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
