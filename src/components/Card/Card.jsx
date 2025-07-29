import S from "./Card.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import notLoaded from "../../assets/not-loaded.svg";
import AddToBasket from "../AddToBasket/AddToBasket.jsx";
import Counters from "../Counters/Counters.jsx";
import { useBasket } from "../../App";

function Card({ product }) {
  const [counters, setCounters] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div key={product._id} className="card">
        <Link to={`/product/${product._id}`} className="image-align">
          <img
            className={`product-image ${isLoaded ? "loaded" : ""}`}
            draggable="false"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = notLoaded;
            }}
            onLoad={() => setIsLoaded(true)}
            src={`${import.meta.env.VITE_API_BASE_URL}/images/${product.image}`} // Updated path
            alt={product.productname}
          />
        </Link>

        <h1 className="product-name">{product.productname}</h1>
        <h2 className="product-price">{product.price} сом</h2>

        <Counters
          product={product}
          onChange={(id, quantity) => {
            setCounters((prev) => ({ ...prev, [id]: quantity }));
          }}
        />

        <AddToBasket product={product} counters={counters}></AddToBasket>
      </div>
    </>
  );
}

export default Card;
