import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import loadingIcon from "../../assets/loading.svg";
import "./CheckPage.css";

const CheckPage = () => {
  const location = useLocation();
  const [orderCode, setOrderCode] = useState(
    location.state?.orderCode || localStorage.getItem("orderCode")
  );
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderCode) {
        setError("Номер заказа не найден.");
        return;
      }

      console.log("Fetching order details for:", orderCode);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/orders/${orderCode}`
        );
        console.log("Order details response:", response.data);
        setOrderDetails(response.data);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Ошибка при получении данных заказа.");
      }
    };

    fetchOrderDetails();
  }, [orderCode]);

  if (error) return <div className="error-message">{error}</div>;
  if (!orderDetails)
    return (
      <>
        <div className="align-loading">
          <img src={loadingIcon} alt="Loading..." className="loading-message" />
        </div>
      </>
    );

  const { totalPrice, createdAt, customerName, address, phone, products } = orderDetails;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  return (
    <div className="check-container">
      <h1 className="check-title">Ваш заказ принят, благодарим вас!</h1>

      <h2 className="check-text">Ваш чек</h2>
      <div className="check-box-line">
        <div className="check-info-align">
          <h2 className="check-info">Номер заказа: </h2>
          <h3 className="check-info-second">{orderCode}</h3>
        </div>

        <div className="check-info-align">
          <h2 className="check-info">Дата:</h2>
          <h3 className="check-info-second"> {formatDate(createdAt)}</h3>
        </div>

        <div className="check-info-align">
          <h2 className="check-info">Сумма заказа:</h2>
          <h3 className="check-info-price">{totalPrice} сом</h3>
        </div>
      </div>

      <h2 className="check-remind">Не забудьте сделать скриншот вашего чека и отправить нам</h2>

      <h1 className="check-bank">наши банковские реквизиты:</h1>
      <div className="check-info-align">
        <h2 className="check-bank-info">Банк:</h2>
        <h2 className="check-bank-info-gray">Пример названия банка</h2>
      </div>

      <div className="check-info-align">
        <h2 className="check-bank-info">номер счета:</h2>
        <h2 className="check-bank-info-gray">56373733575745</h2>
      </div>

      <div className="check-line"></div>

      <h1 className="check-bank">Ваши покупки</h1>
      <div className="check-line-sub"></div>
      <div className="check-items">
        {products.map((item) => (
          <>
            <div key={item._id} className="check-item">
              <div className="check-item-details">
                <h3 className="check-item-name">
                  {item.productname} - {item.quantity}шт.
                </h3>
                <h3 className="check-item-total">{item.price * item.quantity} сом</h3>
              </div>
            </div>
            <div className="check-line-sub"></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default CheckPage;
