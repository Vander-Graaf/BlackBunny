// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRoute } from "./HashRoute.jsx";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import ProductPage from "./components/ProductPage/ProductPage";
import Basket from "./components/Basket/Basket";
import AdminPage from "./components/AdminPage/AdminPage.jsx";
import PaymentPage from "./components/PaymentPage/PaymentPage";
import CheckPage from "./components/CheckPage/CheckPage";

function App() {
  const [basket, setBasket] = useState([]); // Initialize basket as an empty array

  return (
    <Router>
      <div className="container">
        <Header basketCount={basket.reduce((acc, item) => acc + item.quantity, 0)} />
        <Routes>
          <Route path="/" element={<HomePage setBasket={setBasket} />} />
          <Route path="/product/:id" element={<ProductPage setBasket={setBasket} />} />
          <Route path="/basket" element={<Basket basket={basket} setBasket={setBasket} />} />

          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/check" element={<CheckPage />} />

          {/* Хеш-роут только для админки */}
          <Route path="/admin" element={<HashRoute element={<AdminPage />} />} />

          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/check" element={<CheckPage />} />

          {/* Редирект с /#/admin на /admin */}
          <Route path="/#/admin" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
