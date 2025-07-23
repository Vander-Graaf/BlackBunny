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
    <div className="align-category">
      {/* onClick={() => handleSortChange("price")} */}
      <button className="category-btn">
        <h1>Категории</h1>
      </button>

      <div className="category-container">
        <button className="category-switcher-btn">Для члена</button>
        <button className="category-switcher-btn">Для вагины</button>
        <button className="category-switcher-btn">Анальные игрушки</button>
        <button className="category-switcher-btn">Лубриканты</button>
        <button className="category-switcher-btn">Эротическое белье</button>
        <button className="category-switcher-btn">Страпоны</button>
        <button className="category-switcher-btn">Возбудители</button>
        <button className="category-switcher-btn">Феромоны</button>
        <button className="category-switcher-btn">БДСМ и фетиш </button>
        <button className="category-switcher-btn">Презервативы</button>
        <button className="category-switcher-btn">Ролевые игры</button>
        <button className="category-switcher-btn">Все для массажа</button>
      </div>
    </div>
  );
}

export default SortButtons;
