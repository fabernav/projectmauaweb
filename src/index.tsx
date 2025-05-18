import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginAdmin } from "./screens/LoginAdmin";
import { Register } from "./screens/Register";
import { Dashboard } from "./screens/Dashboard";
import { ForgotPassword } from "./screens/ForgotPassword";
import { Home } from "./screens/Home";
import { Notifications } from "./screens/Notifications";
import { Itinerary } from "./screens/Itinerary";
import { Profile } from "./screens/Profile";
import { Config } from "./screens/Config";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginAdmin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </Router>
  </StrictMode>
);