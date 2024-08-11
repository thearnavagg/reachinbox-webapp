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
import GoogleOAuthButton from "./components/GoogleOAuthButton";

const Routers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Clear the token from the URL
      window.history.replaceState({}, document.title, "/");

      // Navigate to the /mail page
      navigate("/mail");
    }
  }, [navigate, location]);

  const isAuthenticated = () => !!localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated() ? <Navigate to="/mail" /> : <GoogleOAuthButton />
        }
      />
      <Route
        path="/mail"
        element={isAuthenticated() ? <MailPage /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

// Wrap App with Router
const App = () => (
  <Router>
    <Routers />
  </Router>
);

export default App;
