import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ServiceOrderForm from "../pages/ServiceOrderForm";
import Home from "../pages/Home";
import ServiceOrderAudio from "../pages/ServiceOrderAudio";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<Register />} path="/register" />
      <Route element={<Home />} path="/home" />
      <Route element={<ServiceOrderForm />} path="/order-form" />
      <Route element={<ServiceOrderAudio />} path="/order-audio" />
    </Routes>
  );
};

export default AppRoutes;
