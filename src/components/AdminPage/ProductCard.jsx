import React from "react";

const ProductCard = ({ product, onEdit, onDelete }) => (
  <div key={product._id} className="card">
    <img
      className="product-image-edit"
      src={`http://127.0.0.1:5000/images/${product.image}`}
      width="100px"
      alt={product.productname}
    />
    <h1 className="product-name-edit">{product.productname}</h1>
    <h2 className="product-price-edit">{product.price} ₽</h2>
    <button onClick={() => onEdit(product)} className="edit-btn">
      Изменить
    </button>
    <button onClick={() => onDelete(product._id)} className="edit-delete-btn">
      Удалить
    </button>
  </div>
);

export default ProductCard;
