import React, { useState, useEffect } from "react";

import "./Basket.css";

import axios from "axios";

function Basket({ basket, setBasket }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Map product IDs in the basket to their details
  const basketItems = basket.map((item) => {
    const product = products.find((p) => p._id === item.id);
    return {
      ...product,
      quantity: item.quantity,
    };
  });

  const removeFromBasket = (id) => {
    const updatedBasket = basket.filter((item) => item.id !== id);
    setBasket(updatedBasket); // Update the basket state
  };

  return (
    <div className="basket">
      <h1 className="your-basket">Ваша корзина</h1>
      {basketItems.length > 0 ? (
        <ul className="basket-list">
          {basketItems.map((item) => (
            <li key={item._id} className="basket-item">
              <img
                className="basket-item-image"
                src={"../../../public/ProductsPhoto/" + item.image + ".png"}
                width="100px"
                alt={item.productname}
              />
              <div className="basket-item-details">
                <h2 className="basket-item-name">{item.productname}</h2>
                <p className="basket-item-price">{item.price} ₽</p>
                <p className="basket-item-quantity">Количество: {item.quantity}</p>
                <p className="basket-item-total">Итого: {item.price * item.quantity} ₽</p>
                <button className="remove-button" onClick={() => removeFromBasket(item._id)}>
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="sub-text-basket">Пусто</p>
      )}
    </div>
  );
}

export default Basket;
