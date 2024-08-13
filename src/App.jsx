import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import MailPage from "./pages/MailPage";
import NotFoundPage from "./pages/NotFoundPage";
import Auth from "./pages/Auth";

const Routers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      navigate("/mail", { replace: true });
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/mail" /> : <Auth />}
      />
      <Route
        path="/mail"
        element={isAuthenticated ? <MailPage /> : <Auth/>}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <Routers />
  </Router>
);

export default App;
