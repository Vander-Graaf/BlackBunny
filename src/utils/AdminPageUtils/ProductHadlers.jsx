// src/utils/productHandlers.js
import axios from "axios";

export const createProductHandlers = (
  setEditingProduct,
  setNewProduct,
  editingProduct,
  newProduct,
  setProducts
) => {
  const handleFetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
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
        `${import.meta.env.VITE_API_BASE_URL}/products/${editingProduct._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      handleFetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (id) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`);
      handleFetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      handleFetchProducts();
    }
  };

  const handleAdd = async () => {
    setNewProduct(null);
    const formData = new FormData();
    for (const key in newProduct) {
      formData.append(key, newProduct[key]);
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/products/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      handleFetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleCancelEdit = () => setEditingProduct(null);
  const handleCancelAdd = () => setNewProduct(null);

  return {
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
  };
};
