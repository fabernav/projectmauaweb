import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginAdmin } from "./screens/LoginAdmin";
import { Dashboard } from "./screens/Dashboard";
import { Home } from "./screens/Home";
import { Notifications } from "./screens/Notifications";
import { Itinerary } from "./screens/Itinerary";
import { Profile } from "./screens/Profile";
import { Config } from "./screens/Config";
import { Help } from "./screens/Help";
import { GerenciarVans } from "./screens/GerenciarVans";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginAdmin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/GerenciarVans" element={<GerenciarVans />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/config" element={<Config />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  </StrictMode>
);
