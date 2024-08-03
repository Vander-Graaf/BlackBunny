import React, { useState, useEffect } from "react";
import "./Basket.css";
import axios from "axios";
import loadingIcon from "../../assets/loading.gif";

function Basket({ basket, setBasket }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      try {
        const response = await axios.get("https://blackbunny-backend.onrender.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
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
    <>
      <div className="payment-align">
        <div className="payment-box">
          <button className="payment-confirm">Оформить заказ</button>
        </div>
      </div>

      <div className="basket">
        <h1 className="your-basket">Ваша корзина</h1>
        {loading ? ( // Show loading message if data is being fetched
          <img src={loadingIcon} alt="Loading..." className="loading-message" />
        ) : basketItems.length > 0 ? (
          <div className="basket-list">
            {basketItems.map((item) => (
              <li key={item._id} className="basket-item">
                <img
                  className="basket-item-image"
                  src={`https://blackbunny-backend.onrender.com/images/${item.image}`} // Update the image path
                  width="100px"
                  alt={item.productname}
                />
                <div className="basket-item-details">
                  <h2 className="basket-item-name">{item.productname}</h2>
                  <div className="basket-item-price">
                    <h1 className="pre-size">Стоимость:</h1>
                    <h2 className="post-size">{item.price} ₽</h2>
                  </div>
                  <div className="basket-item-quantity">
                    <h1 className="pre-size">Количество:</h1>
                    <h2 className="post-size">{item.quantity}</h2>
                  </div>
                  <div className="basket-item-total">
                    <h1 className="pre-size">Итого:</h1>
                    <h2 className="post-size">{item.price * item.quantity} ₽</h2>
                  </div>
                  <button className="remove-button" onClick={() => removeFromBasket(item._id)}>
                    X
                  </button>
                </div>
              </li>
            ))}
          </div>
        ) : (
          <p className="sub-text-basket">Пусто</p>
        )}
      </div>
    </>
  );
}

export default Basket;
