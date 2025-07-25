import React from "react";
import notLoaded from "../../assets/not-loaded.svg";

const ProductCard = ({ product, onEdit, onDelete }) => (
  <div key={product._id} className="card">
    <div className="image-align">
      <img
        className="product-image-edit"
        src={`${import.meta.env.VITE_API_BASE_URL}/images/${product.image}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = notLoaded;
        }}
        width="100px"
        alt={product.productname}
      />
    </div>

    <h1 className="product-name-edit">{product.productname}</h1>
    <h2 className="product-price-edit">{product.price} сом</h2>
    <button onClick={() => onEdit(product)} className="edit-btn">
      Изменить
    </button>
    <button onClick={() => onDelete(product._id)} className="edit-delete-btn">
      Удалить
    </button>
  </div>
);

export default ProductCard;
