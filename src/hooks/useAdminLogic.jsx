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
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/login`, {
        password,
      });
      if (response.data.authenticated) {
        setAuthenticated(true);
        handleFetchProducts();
      } else {
        setError("Неверный пароль");
      }
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      setError("Произошла ошибка при авторизации");
    }
  };

  return { handleLogin };
};
