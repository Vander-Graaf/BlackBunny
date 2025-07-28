import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Basket.css";
import axios from "axios";
import loadingIcon from "../../assets/loading.svg";
import notLoaded from "../../assets/not-loaded.svg";

function Basket({ basket, setBasket }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate total price
  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      basket.forEach((item) => {
        const product = products.find((p) => p._id === item.id);
        if (product) {
          total += product.price * item.quantity;
        }
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [basket, products]);

  const basketItems = basket.map((item) => {
    const product = products.find((p) => p._id === item.id);
    return {
      ...product,
      quantity: item.quantity,
    };
  });

  const removeFromBasket = (id) => {
    const updatedBasket = basket.filter((item) => item.id !== id);
    setBasket(updatedBasket);
  };

  const handleCheckout = () => {
    navigate("/payment", {
      state: {
        totalPrice,
        basketItems: basket.map((item) => {
          const product = products.find((p) => p._id === item.id);
          return { ...product, quantity: item.quantity };
        }), // Include all product details
      },
    });
  };
  return (
    <>
      <div className="payment-align">
        <div className="payment-box">
          <h1 className="total-cost">Общая стоимость:</h1>
          <h1 className="total-cost-number">{totalPrice} сом</h1>
          <button className="payment-confirm" onClick={handleCheckout}>
            Оформить заказ
          </button>
        </div>
      </div>

      <div className="basket">
        <h1 className="your-basket">Ваша корзина</h1>
        {loading ? (
          <img src={loadingIcon} alt="Loading..." className="loading-message" />
        ) : basketItems.length > 0 ? (
          <div className="basket-list">
            {basketItems.map((item) => (
              <li key={item._id} className="basket-item">
                <img
                  className="basket-item-image"
                  src={`${import.meta.env.VITE_API_BASE_URL}/images/${item.image}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = notLoaded;
                  }}
                  width="100px"
                  alt={item.productname}
                />
                <div className="basket-item-details">
                  <h2 className="basket-item-name">{item.productname}</h2>
                  <div className="basket-item-price">
                    <h1 className="pre-size">Стоимость:</h1>
                    <h2 className="post-size">{item.price} сом</h2>
                  </div>
                  <div className="basket-item-quantity">
                    <h1 className="pre-size">Количество:</h1>
                    <h2 className="post-size">{item.quantity}</h2>
                  </div>
                  <div className="basket-item-total">
                    <h1 className="pre-size">Итого:</h1>
                    <h2 className="post-size">{item.price * item.quantity} сом</h2>
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
