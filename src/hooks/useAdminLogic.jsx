import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAdminLogic = ({ password, setAuthenticated, setError, handleFetchProducts }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#/admin");
    }
    if (window.location.hash === "#/admin") {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/products/admin/login`,
        { password }
      );
      if (response.data.authenticated) {
        setAuthenticated(true);
        handleFetchProducts();
      } else {
        setError("Invalid password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred while logging in.");
    }
  };

  return { handleLogin };
};
