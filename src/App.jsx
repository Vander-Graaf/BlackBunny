// App.js
import { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouteHandler } from "./HashRouteHandler.jsx";

import Header from "./components/Header/Header";

import Home from "./pages/Home/Home.jsx";
import Product from "./pages/Product/Product.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import Check from "./pages/Check/Check.jsx";
import Admin from "./pages/Admin/Admin.jsx";

import Basket from "./components/Basket/Basket";

const BasketContext = createContext();
export const useBasket = () => useContext(BasketContext);

function App() {
  const [basket, setBasket] = useState([]); // Initialize basket as an empty array

  return (
    <>
      <BasketContext.Provider value={{ basket, setBasket }}>
        <Router>
          <HashRouteHandler></HashRouteHandler>
          <div className="container">
            <Header basketCount={basket.reduce((acc, item) => acc + item.quantity, 0)} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product setBasket={setBasket} />} />
              <Route path="/basket" element={<Basket basket={basket} setBasket={setBasket} />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/check" element={<Check />} />

              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </Router>
      </BasketContext.Provider>
    </>
  );
}

export default App;
