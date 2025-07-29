import S from "./Cards.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import notLoaded from "../../assets/not-loaded.svg";
import AddToBasket from "../AddToBasket/AddToBasket.jsx";
import Counters from "../Counters/Counters.jsx";
import { useBasket } from "../../App";

import Card from "../../components/Card/Card.jsx";
import loadingIcon from "../../assets/loading.svg";

function Cards({ products, loading }) {
  const [counters, setCounters] = useState({});

  return (
    <>
      <div className="Cards">
        {loading ? (
          <img src={loadingIcon} alt="Loading..." className="loading-message" />
        ) : (
          products.map((product) => <Card product={product} />)
        )}
      </div>
    </>
  );
}

export default Cards;
