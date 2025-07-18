// HashRouteHandler.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const HashRouteHandler = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Если URL содержит хеш, но не начинается с /#/admin
    if (location.hash && !location.pathname.startsWith("/admin")) {
      navigate(location.hash.substring(1), { replace: true });
    }
  }, [location, navigate]);

  return children;
};
