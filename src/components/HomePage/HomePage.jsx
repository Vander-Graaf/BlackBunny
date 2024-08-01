import React, { useState, useEffect } from "react";
import SortButtons from "../SortButtons/SortButtons.jsx";
import Popup from "../Popup/Popup.jsx";
import "./HomePage.css";
import axios from "axios";
import loadingIcon from "../../assets/loading.gif";

// Create a context for all images in the ProductsPhoto directory
const images = import.meta.glob("/src/assets/ProductsPhoto/*.png");

const getImagePath = (imageName) => {
  const path = `/src/assets/ProductsPhoto/${imageName}.png`;
  return images[path] ? images[path]() : "/default.png"; // Use default.png for fallback
};

function HomePage({ setBasket }) {
  const [products, setProducts] = useState([]);
  const [counters, setCounters] = useState({});
  const [imagePaths, setImagePaths] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      try {
        const response = await axios.get("https://blackbunny-backend.onrender.com/products");
        setProducts(response.data);

        const initialCounters = response.data.reduce((acc, product) => {
          acc[product._id] = 1;
          return acc;
        }, {});
        setCounters(initialCounters);

        const loadImages = async () => {
          const imagesPromises = response.data.map(async (product) => {
            const imagePath = await getImagePath(product.image);
            return { id: product._id, src: imagePath.default || imagePath };
          });

          const loadedImages = await Promise.all(imagesPromises);
          const imagesMap = loadedImages.reduce((acc, { id, src }) => {
            acc[id] = src;
            return acc;
          }, {});

          setImagePaths(imagesMap);
        };

        await loadImages();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
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
      // Show popup when product is added
      setPopupMessage("Товар добавлен в корзину!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000); // Hide popup after 3 seconds
    }
  };

  return (
    <>
      <SortButtons />
      <Popup message={popupMessage} show={showPopup} onClose={() => setShowPopup(false)} />
      <div className="align-cards">
        {loading ? (
          <img src={loadingIcon} alt="Loading..." className="loading-message" />
        ) : products.length > 0 ? (
          <div className="Cards">
            {products.map((product) => (
              <div key={product._id} className="card">
                <div className="image-align">
                  <img
                    className="product-image"
                    draggable="false"
                    src={imagePaths[product._id] || "/default.png"} // Fallback to a default image if not found
                    width="100px"
                    alt=""
                  />
                </div>
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
          </div>
        ) : (
          <p className="no-items-msg">Нет доступных продуктов.</p>
        )}
      </div>
    </>
  );
}

export default HomePage;
