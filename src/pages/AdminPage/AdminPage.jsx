import React, { useState, useEffect } from "react";

import "../../components/OrderQueue/OrderQueue.css";
import Login from "./AdminLogin.jsx";
import "./AdminPage.css";
import Footer from "../../components/Footer/Footer.jsx";

import { createProductHandlers } from "../../utils/AdminPageUtils/ProductHadlers.jsx";
import { RenderHandler } from "../../utils/AdminPageUtils/RenderHandler.jsx";
import { useAdminLogic } from "../../hooks/useAdminLogic";

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  const [error, setError] = useState("");
  const [currentView, setCurrentView] = useState("editProducts"); // State to manage the current view

  const {
    handleFetchProducts,
    handleEdit,
    handleNew,
    handleChange,
    handleFileChange,
    handleSave,
    handleDelete,
    handleAdd,
    handleCancelEdit,
    handleCancelAdd,
  } = createProductHandlers(
    setEditingProduct,
    setNewProduct,
    editingProduct,
    newProduct,
    setProducts
  );

  const { handleLogin } = useAdminLogic({
    password,
    setAuthenticated,
    setError,
    handleFetchProducts,
  });

  const { handleEditProducts, handleOrderQueue, handleOrderHistory } = RenderHandler({
    products,
    editingProduct,
    newProduct,
    handleNew,
    handleEdit,
    handleDelete,
    handleChange,
    handleFileChange,
    handleSave,
    handleAdd,
    handleCancelEdit,
    handleCancelAdd,
  });

  if (!authenticated) {
    return (
      <Login
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        error={error}
      />
    );
  }

  return (
    <>
      <div>
        {/* Buttons to switch between views */}
        <div className="admin-buttons">
          <button onClick={() => setCurrentView("editProducts")} className="switch-btn">
            Редактирование
          </button>
          <button onClick={() => setCurrentView("orders")} className="switch-btn">
            Заказы
          </button>
          <button onClick={() => setCurrentView("orderHistory")} className="switch-btn">
            История заказов
          </button>
        </div>

        {/* Conditional rendering based on the selected view */}
        {currentView === "editProducts" && handleEditProducts()}
        {currentView === "orders" && handleOrderQueue()}
        {currentView === "orderHistory" && handleOrderHistory()}
      </div>
      <Footer></Footer>
    </>
  );
};

export default AdminPage;
