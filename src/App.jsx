// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouteHandler } from "./HashRouteHandler.jsx";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import Basket from "./components/Basket/Basket";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import PaymentPage from "./pages/PaymentPage/PaymentPage.jsx";
import CheckPage from "./components/CheckPage/CheckPage";
import { Navigate } from "react-router-dom";

function App() {
  const [basket, setBasket] = useState([]); // Initialize basket as an empty array

  return (
    <Router>
      <HashRouteHandler></HashRouteHandler>
      <div className="container">
        <Header basketCount={basket.reduce((acc, item) => acc + item.quantity, 0)} />
        <Routes>
          <Route path="/" element={<HomePage setBasket={setBasket} />} />
          <Route path="/product/:id" element={<ProductPage setBasket={setBasket} />} />
          <Route path="/basket" element={<Basket basket={basket} setBasket={setBasket} />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/check" element={<CheckPage />} />

          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
