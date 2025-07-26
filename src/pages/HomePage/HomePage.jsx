import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SortButtons from "../../components/SortButtons/SortButtons.jsx";
import Popup from "../../components/Popup/Popup.jsx";
import "./HomePage.css";
import axios from "axios";
import Footer from "../../components/Footer/Footer.jsx";
import PageSwitcher from "../../components/PageSwitcher/PageSwitcher.jsx";
import loadingIcon from "../../assets/loading.svg";
import notLoaded from "../../assets/not-loaded.svg";

function HomePage({ setBasket }) {
  const [products, setProducts] = useState([]);
  const [counters, setCounters] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page = 1, category = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/products?page=${page}&limit=10&category=${category}`
      );
      const { products, totalPages, currentPage } = response.data;

      setProducts(products);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);

      const initialCounters = products.reduce((acc, product) => {
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page, filteredCategory); // Здесь должен обновиться totalPages и products
  };
  // Перезапускаем загрузку при изменении страницы или категории
  useEffect(() => {
    fetchProducts(currentPage, filteredCategory);
  }, [currentPage, filteredCategory]);

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

  const filteredProducts =
    (filteredCategory
      ? products.filter((product) => product.category === filteredCategory)
      : products) || [];

  return (
    <>
      <div className="align-greeting">
        <div className="greeting-msgs">
          <div>
            <h1>Добро пожаловать в секс шоп </h1>
            <h2>BlackBunny!</h2>
          </div>

          <h3>Мы работаем с 10 утра до 12 ночи</h3>
        </div>
      </div>

      <SortButtons onCategorySelect={setFilteredCategory} />

      <Popup message={popupMessage} show={showPopup} onClose={() => setShowPopup(false)} />
      <div className="align-cards">
        {loading ? (
          <img src={loadingIcon} alt="Loading..." className="loading-message" />
        ) : filteredProducts.length > 0 ? (
          <div className="Cards">
            {filteredProducts.map((product) => (
              <div key={product._id} className="card">
                <Link to={`/product/${product._id}`} className="image-align">
                  <img
                    className="product-image"
                    draggable="false"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = notLoaded;
                    }}
                    src={`${import.meta.env.VITE_API_BASE_URL}/images/${product.image}`} // Updated path
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
      <PageSwitcher
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer></Footer>
    </>
  );
}

export default HomePage;
