import { useLocation, Navigate } from "react-router-dom";

export const HashRoute = ({ element }) => {
  const location = useLocation();

  if (!location.hash) {
    return <Navigate to={`#${location.pathname}`} replace />;
  }

  return element;
};
