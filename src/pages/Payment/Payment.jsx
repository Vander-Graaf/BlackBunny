import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer.jsx";
import "./Payment.css";
import whatsappIcon from "../../assets/whatsapp.png";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice, basketItems } = location.state || {};

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
        totalPrice,
        customerName: name,
        address,
        phone,
        products: basketItems,
      });

      const { orderCode, createdAt } = response.data;

      // Save orderCode to localStorage
      localStorage.setItem("orderCode", orderCode);

      navigate("/check", {
        state: {
          orderCode,
          totalPrice,
          createdAt,
          customerName: name,
          address,
          phone,
          products: basketItems,
        },
      });
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Ошибка при оформлении заказа. Пожалуйста, попробуйте снова.");
    }
  };

  return (
    <>
      <div className="payment-container">
        <h1 className="payment-title">Оформление заказа</h1>
        <div className="payment-line"></div>
        <h1 className="payment-details">Детали оплаты</h1>

        <div className="payment-input-div">
          <h2 className="payment-input-text">Имя</h2>
          <input
            type="text"
            className="payment-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="payment-input-div">
          <h2 className="payment-input-text">Адрес</h2>
          <input
            type="text"
            placeholder="Номер дома, квартиры и название улицы"
            className="payment-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="payment-input-div">
          <h2 className="payment-input-text">Телефон</h2>
          <input
            type="text"
            className="payment-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <h1 className="payment-deliver">Доставка</h1>
        <h2 className="payment-deliver-text">Мы Доставляем товары по городу Кара-Балта</h2>

        <h1 className="payment-deliver">Способ оплаты:</h1>
        <h1 className="payment-deliver-sub">прямой банковский перевод</h1>
        <h2 className="payment-deliver-text">
          Оплату нужно направлять напрямую на наш банковский счет. Затем вы должны отправить номер
          заказа и чек оплаты на наш WhatsApp. Заказ будет отправлен после поступления средств на
          наш счет.
        </h2>

        <div className="whatsapp-box">
          <h1 className="whatsapp-text">WhatsApp</h1>
          <img src={whatsappIcon} alt="" width={30} height={30} className="whatsapp-image" />
        </div>

        <h1 className="payment-whatsapp">0959 31 69 79</h1>

        <button className="payment-accept" onClick={handleSubmit}>
          Подтвердить заказ
        </button>

        {error && <p className="error-message">{error}</p>}

        <div className="total-cost-box">
          <h1 className="total-cost">Сумма заказа:</h1>
          <h1 className="total-cost-number">{totalPrice} сом</h1>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Payment;
