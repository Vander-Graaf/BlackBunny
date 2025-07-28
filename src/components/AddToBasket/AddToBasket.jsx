import S from "./AddToBasket.module.css";
import { useState, useEffect } from "react";
import Popup from "../../components/Popup/Popup.jsx";
import { useBasket } from "../../App";

function AddToBasket({ product, counters }) {
  const { basket, setBasket } = useBasket();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

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
      setPopupMessage("Добавлено в корзину!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1500);
    }
  };
  return (
    <>
      <Popup message={popupMessage} show={showPopup} />
      <button className="add-to-basket" onClick={() => addToBasket(product._id)}>
        в корзину
      </button>
    </>
  );
}

export default AddToBasket;
