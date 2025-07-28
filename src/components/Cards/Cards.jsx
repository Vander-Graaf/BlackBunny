import S from "./Cards.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import notLoaded from "../../assets/not-loaded.svg";
import AddToBasket from "../AddToBasket/AddToBasket.jsx";
import Counters from "../Counters/Counters.jsx";
import { useBasket } from "../../App";

function Cards({ products }) {
  const [counters, setCounters] = useState({});

  return (
    <>
      <div className="Cards">
        {products.map((product) => (
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

            <Counters
              product={product}
              onChange={(id, quantity) => {
                setCounters((prev) => ({ ...prev, [id]: quantity }));
              }}
            />

            <AddToBasket product={product} counters={counters}></AddToBasket>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cards;
