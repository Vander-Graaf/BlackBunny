import { useEffect, useState } from "react";
import axios from "axios";
import "./OrderHistory.module.css";
import loadingIcon from "../../../../assets/loading.svg";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders`);

        // Filter out orders with status "Ожидание"
        const filteredOrders = response.data.filter((order) => order.status !== "Ожидание");

        // Optionally sort the remaining orders
        const sortedOrders = filteredOrders.sort((a, b) => {
          if (a.status === "выполнен" && b.status !== "выполнен") return -1;
          if (a.status !== "выполнен" && b.status === "выполнен") return 1;
          return 0; // For items with the same status, keep original order
        });

        setOrders(sortedOrders);
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

  const handleDelete = async (orderCode) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/orders/${orderCode}`);
      // Update the orders list after deletion
      setOrders(orders.filter((order) => order.orderCode !== orderCode));
    } catch (err) {
      console.error("Error deleting order:", err);
      setError("Ошибка при удалении заказа.");
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
        <h2 className="orders-no-items">История заказов пуста</h2>
      </div>
    );

  return (
    <div className="orders-container">
      <h2 className="orders-title">История заказов</h2>

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

          <div className="align-details-text">
            <h2>Статус заказа:</h2>
            <h3 className={order.status === "выполнен" ? "status-completed" : "status-declined"}>
              {order.status}
            </h3>
          </div>

          <div className="order-btns">
            <button className="order-delete" onClick={() => handleDelete(order.orderCode)}>
              Удалить заказ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
