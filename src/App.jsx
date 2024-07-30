// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import Basket from "./components/Basket/Basket.jsx";

function App() {
  const [basket, setBasket] = useState([]); // Initialize basket as an empty array

  return (
    <Router>
      <div className="container">
        <Header basketCount={basket.reduce((acc, item) => acc + item.quantity, 0)} />
        <Routes>
          <Route path="/" element={<HomePage setBasket={setBasket} />} />
          <Route path="/basket" element={<Basket basket={basket} setBasket={setBasket} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
