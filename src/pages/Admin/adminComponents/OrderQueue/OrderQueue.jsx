import { useEffect, useState } from "react";
import axios from "axios";
import "./OrderQueue.css"; // Ensure this CSS file includes styling for the loading gif
import loadingIcon from "../../../../assets/loading.svg";

const Order = ({ onOrderUpdated }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders`);
        const filteredOrders = response.data.filter((order) => order.status === "Ожидание");
        setOrders(filteredOrders);
        setLoading(false); // End loading
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Ошибка при получении заказов.");
        setLoading(false); // End loading even if there's an error
      }
    };

    fetchOrders();
  }, []);

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

  const handleStatusChange = async (orderCode, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/orders/${orderCode}`, { status });
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders`);
      const filteredOrders = response.data.filter((order) => order.status === "Ожидание");
      setOrders(filteredOrders);
      if (onOrderUpdated) onOrderUpdated();
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Ошибка при обновлении статуса заказа.");
    }
  };

  if (loading)
    return (
      <div className="align-loading">
        <img src={loadingIcon} alt="Loading..." className="loading-message" />
      </div>
    );
  if (error) return <div className="error-message">{error}</div>;
  if (!orders.length)
    return (
      <div className="orders-container">
        <h2 className="orders-no-items">Нет заказов</h2>
      </div>
    );

  return (
    <div className="orders-container">
      <h2 className="orders-title">Список заказов</h2>

      {orders.map((order) => (
        <div key={order._id} className="order-box">
          <div className="order-code-text">Код заказа: {order.orderCode}</div>
          <div className="order-details">
            <div className="user-details">
              <h1 className="details-title">Информация о клиенте</h1>

              <div className="align-details-text">
                <h2>Имя:</h2>
                <h3>{order.customerName}</h3>
              </div>
              <div className="align-details-text">
                <h2>Адрес:</h2>
                <h3>{order.address}</h3>
              </div>
              <div className="align-details-text">
                <h2>Телефон:</h2>
                <h3>{order.phone}</h3>
              </div>
              <div className="align-details-text">
                <h2>Дата:</h2>
                <h3>{formatDate(order.createdAt)}</h3>
              </div>
            </div>

            <div className="products-details">
              <h1 className="details-title">Детали заказа</h1>

              {order.products.map((product) => (
                <div key={product._id} className="align-details-text">
                  <h2>{product.productname}</h2>
                  <h3>- {product.quantity}шт.</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="align-details-text">
            <h2>Общая цена: </h2>
            <h3 className="red-color">{order.totalPrice} сом</h3>
          </div>

          <div className="order-btns">
            <button
              className="order-done"
              onClick={() => handleStatusChange(order.orderCode, "выполнен")}
            >
              Заказ выполнен
            </button>
            <button
              className="order-decline"
              onClick={() => handleStatusChange(order.orderCode, "отклонен")}
            >
              Отклонить заказ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
