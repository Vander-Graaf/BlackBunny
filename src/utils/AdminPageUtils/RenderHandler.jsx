import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import ProductForm from "../../components/ProductForm/ProductForm.jsx";

export const RenderHandler = ({
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
}) => {
  const handleEditProducts = () => (
    <div className="align-cards-admin">
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

  const handleOrderQueue = () => (
    <div>
      <OrderQueue></OrderQueue>
    </div>
  );

  const handleOrderHistory = () => (
    <div>
      <OrderHistory></OrderHistory>
    </div>
  );

  return {
    handleEditProducts,
    handleOrderQueue,
    handleOrderHistory,
  };
};
