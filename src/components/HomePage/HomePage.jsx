import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SortButtons from "../SortButtons/SortButtons.jsx";
import Popup from "../Popup/Popup.jsx";
import "./HomePage.css";
import axios from "axios";
import loadingIcon from "../../assets/loading.gif";

function HomePage({ setBasket }) {
  const [products, setProducts] = useState([]);
  const [counters, setCounters] = useState({});
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
        setProducts(response.data);

        const initialCounters = response.data.reduce((acc, product) => {
          acc[product._id] = 1;
          return acc;
        }, {});
        setCounters(initialCounters);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortProducts = (criteria, order) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (criteria === "price") {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      } else if (criteria === "category") {
        return order === "asc"
          ? a.productname.localeCompare(b.productname)
          : b.productname.localeCompare(a.productname);
      }
      return 0;
    });
    setProducts(sortedProducts);
  };

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
      setPopupMessage("Товар добавлен в корзину!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  return (
    <>
      <SortButtons onSort={sortProducts} />
      <Popup message={popupMessage} show={showPopup} onClose={() => setShowPopup(false)} />
      <div className="align-cards">
        {loading ? (
          <img src={loadingIcon} alt="Loading..." className="loading-message" />
        ) : products.length > 0 ? (
          <div className="Cards">
            {products.map((product) => (
              <div key={product._id} className="card">
                <Link to={`/product/${product._id}`} className="image-align">
                  <img
                    className="product-image"
                    draggable="false"
                    src={`${import.meta.env.VITE_API_BASE_URL}/images/${product.image}`} // Updated path
                    width="100px"
                    alt={product.productname}
                  />
                </Link>
                <h1 className="product-name">{product.productname}</h1>
                <h2 className="product-price">{product.price} сом</h2>
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
                  в корзину
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-items-msg-h">Нет доступных товаров.</p>
        )}
      </div>
    </>
  );
}

export default HomePage;
