import { useState } from "react";
import { Link } from "react-router-dom";

import basketIcon from "../../assets/basket.png";

import "./Header.css";

function Header({ basketCount }) {
  return (
    <nav>
      <div className="align-header-text">
        <div className="text-column">
          <Link to="/">
            <button className="header-btn">
              <h1 className="main-text">Black Bunny</h1>
            </button>
          </Link>
          <div className="sub-text-container">
            <h1 className="sub-text">Онлайн секс шоп</h1>
          </div>
        </div>

        <div className="empty-space"></div>
        <div className="nav-btns">
          <Link to="/basket">
            <button className="header-basket">
              <h1 className="basket-count">{basketCount}</h1>
              <img src={basketIcon} alt="Basket Icon" />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
