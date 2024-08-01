// HomePage.js
import React, { useState, useEffect } from "react";
import SortButtons from "../SortButtons/SortButtons.jsx";
import "./HomePage.css";
import axios from "axios";

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

  useEffect(() => {
    const fetchProducts = async () => {
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

        loadImages();
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

      <div className="align-cards">
        {products.length > 0 ? (
          <ul className="Cards">
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
          </ul>
        ) : (
          <p className="no-items-msg">Нет доступных продуктов.</p>
        )}
      </div>
    </>
  );
}

export default HomePage;
