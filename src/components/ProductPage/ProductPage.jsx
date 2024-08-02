// ProductPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import loadingIcon from "../../assets/loading.gif";
import "./ProductPage.css";

// Create a context for all images in the ProductsPhoto directory
const images = import.meta.glob("/src/assets/ProductsPhoto/*.png");

const getImagePath = (imageName) => {
  const path = `/src/assets/ProductsPhoto/${imageName}.png`;
  return images[path] ? images[path]() : "/default.png"; // Use default.png for fallback
};

function ProductPage({ setBasket }) {
  const { id } = useParams(); // Use useParams to get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [counter, setCounter] = useState(1);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://blackbunny-backend.onrender.com/products/${id}`);
        const productData = response.data;
        setProduct(productData);

        const imagePath = await getImagePath(productData.image);
        setImagePath(imagePath.default || imagePath);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const decrement = () => {
    setCounter((prevCounter) => (prevCounter > 1 ? prevCounter - 1 : 1));
  };

  const addToBasket = () => {
    if (counter > 0) {
      setBasket((prevBasket) => {
        const existingProductIndex = prevBasket.findIndex((item) => item.id === product._id);
        if (existingProductIndex > -1) {
          const updatedBasket = [...prevBasket];
          updatedBasket[existingProductIndex].quantity += counter;
          return updatedBasket;
        } else {
          return [...prevBasket, { id: product._id, quantity: counter }];
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="loading-image-container">
        <img src={loadingIcon} alt="Loading..." className="loading-message-product" />;
      </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-page-page">
      <div className="image-align-page">
        <img
          className="product-image-page"
          draggable="false"
          src={imagePath || "/default.png"} // Fallback to a default image if not found
          width="200px"
          alt={product.productname}
        />
      </div>
      <div className="product-name-box">
        <h1 className="product-name-page">{product.productname}</h1>
      </div>

      <div className="description-box">
        <h1 className="description-title">Описание:</h1>
        <h1 className="product-description-page">{product.description}</h1>
      </div>

      <div className="basket-box">
        <div className="align-count-page">
          <button className="decrease-count-page" onClick={decrement}>
            <h1 className="count-font">-</h1>
          </button>
          <div className="count-page">{counter}</div>
          <button className="increase-count-page" onClick={increment}>
            <h1 className="count-font">+</h1>
          </button>
        </div>
        <button className="add-to-basket-page" onClick={addToBasket}>
          Добавить в корзину
        </button>
        <h2 className="product-price-page">{product.price} ₽</h2>
      </div>
    </div>
  );
}

export default ProductPage;
