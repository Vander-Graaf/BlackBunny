import { useState } from "react";
import "./SortButtons.css";
import arrow from "../../assets/arrow.png";

function SortButtons() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="align-sort">
        <button className="sort-btn">
          <h1>Сортировать</h1>
        </button>
        <button className="filter-btn">
          <h1>цена</h1>
          <img className="filter-arrow" src={arrow} alt="" />
        </button>
        <button className="filter-btn">
          <h1>категория</h1>
          <img className="filter-arrow" src={arrow} alt="" />
        </button>
        <button className="filter-btn">
          <h1>наличие</h1>
          <img className="filter-arrow" src={arrow} alt="" />
        </button>
        <img src="../../assets/ProductsPhoto/1.png" width="100px" alt="" />
      </div>
    </>
  );
}

export default SortButtons;
