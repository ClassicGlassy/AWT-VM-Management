import { createRoot } from "react-dom/client";
import "./index.css";

// React router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages

// @Public
import Register from "./pages/Register";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";

// @Private
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import DashboardCreateVM from "./pages/dashboard/DashboardCreateVM";
import DashboardDestroyVM from "./pages/dashboard/DashboardDestroyVM";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* @Public page */}
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* @Private page */}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route element={<DashboardIndex />} index />
        <Route path="create-vm" element={<DashboardCreateVM />} />
        <Route path="destroy-vm" element={<DashboardDestroyVM />} />
      </Route>

      {/* @404 page */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);
