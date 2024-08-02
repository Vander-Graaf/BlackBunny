import { useState } from "react";
import "./SortButtons.css";
import arrow from "../../assets/arrow.png";

function SortButtons({ onSort }) {
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

  const handleSortChange = (criteria) => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    onSort(criteria, sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="align-sort">
      <button className="sort-btn">
        <h1>Сортировать</h1>
      </button>
      <button className="filter-btn" onClick={() => handleSortChange("price")}>
        <h1>цена</h1>
        <img className="filter-arrow" src={arrow} alt="" />
      </button>
      <button className="filter-btn" onClick={() => handleSortChange("category")}>
        <h1>категория</h1>
        <img className="filter-arrow" src={arrow} alt="" />
      </button>
    </div>
  );
}

export default SortButtons;
