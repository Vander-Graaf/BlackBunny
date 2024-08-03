import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import "./AdminPage.css";

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://blackbunny-backend.onrender.com/products/admin/login",
        { password }
      );
      if (response.data.authenticated) {
        setAuthenticated(true);
        fetchProducts();
      } else {
        setError("Invalid password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred while logging in.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://blackbunny-backend.onrender.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct(null);
  };

  const handleNew = () => {
    setNewProduct({});
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    }
    if (newProduct) {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: files[0] });
    }
    if (newProduct) {
      setNewProduct({ ...newProduct, [name]: files[0] });
    }
  };

  const handleSave = async () => {
    setEditingProduct(null);
    const formData = new FormData();
    for (const key in editingProduct) {
      formData.append(key, editingProduct[key]);
    }
    try {
      await axios.put(
        `https://blackbunny-backend.onrender.com/products/${editingProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      if (error.response) {
        console.error("Backend error message:", error.response.data);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://blackbunny-backend.onrender.com/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAdd = async () => {
    setNewProduct(null);
    const formData = new FormData();
    for (const key in newProduct) {
      formData.append(key, newProduct[key]);
    }
    try {
      await axios.post("https://blackbunny-backend.onrender.com/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleCancelAdd = () => {
    setNewProduct(null);
  };

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
    <div>
      <div className="align-add-btn">
        <h2 className="edit-title">Редактирование товара</h2>
        <button onClick={handleNew} className="new-btn">
          Добавить товар
        </button>
      </div>

      <div className="Cards">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onSave={handleSave}
          onCancel={handleCancelEdit}
          title="Редактирование товара"
        />
      )}
      {newProduct && (
        <ProductForm
          product={newProduct}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onSave={handleAdd}
          onCancel={handleCancelAdd}
          title="Добавление нового товара"
        />
      )}
    </div>
  );
};

export default AdminPage;
