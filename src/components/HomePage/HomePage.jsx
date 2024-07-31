// HomePage.js
import React, { useState, useEffect } from "react";
import SortButtons from "../SortButtons/SortButtons.jsx";
import "./HomePage.css";
import axios from "axios";

function HomePage({ setBasket }) {
  const [products, setProducts] = useState([]);
  const [counters, setCounters] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/products");
        setProducts(response.data);
        const initialCounters = response.data.reduce((acc, product) => {
          acc[product._id] = 1;
          return acc;
        }, {});
        setCounters(initialCounters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  const increment = (id) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [id]: prevCounters[id] + 1,
    }));
  };

  const decrement = (id) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [id]: prevCounters[id] > 1 ? prevCounters[id] - 1 : 1,
    }));
  };

  const addToBasket = (id) => {
    if (counters[id] > 0) {
      setBasket((prevBasket) => {
        const existingProductIndex = prevBasket.findIndex((item) => item.id === id);
        if (existingProductIndex > -1) {
          const updatedBasket = [...prevBasket];
          updatedBasket[existingProductIndex].quantity += counters[id];
          return updatedBasket;
        } else {
          return [...prevBasket, { id, quantity: counters[id] }];
        }
      });
    }
  };

  return (
    <>
      <SortButtons />
      <div>
        {products.length > 0 ? (
          <ul className="HomePage">
            {products.map((product) => (
              <div key={product._id} className="card">
                <img
                  className="product-image"
                  draggable="false"
                  src={"../../public/" + product.image + ".png"}
                  width="100px"
                  alt=""
                />
                <h1 className="product-name">{product.productname}</h1>
                <h2 className="product-price">{product.price} ₽</h2>

                <div className="align-count">
                  <button className="decrease-count" onClick={() => decrement(product._id)}>
                    <h1 className="count-font">-</h1>
                  </button>
                  <div className="count">{counters[product._id]}</div>
                  <button className="increase-count" onClick={() => increment(product._id)}>
                    <h1 className="count-font">+</h1>
                  </button>
                </div>

                <button className="add-to-basket" onClick={() => addToBasket(product._id)}>
                  Добавить в корзину
                </button>
              </div>
            ))}
          </ul>
        ) : (
          <p className="no-items-msg">Нет доступных продуктов.</p>
        )}
      </div>
    </>
  );
}

export default HomePage;
