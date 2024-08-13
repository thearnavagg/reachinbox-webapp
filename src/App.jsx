import React, { useEffect } from "react";
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      window.history.replaceState({}, document.title, "/");

      navigate("/mail");
    }
  }, [navigate, location]);

  const isAuthenticated = () => !!localStorage.getItem("token");

  return (
      <Routes>
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/mail" /> : <Auth />}
        />
        <Route
          path="/mail"
          element={isAuthenticated() ? <MailPage /> : <Navigate to="/" />}
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
