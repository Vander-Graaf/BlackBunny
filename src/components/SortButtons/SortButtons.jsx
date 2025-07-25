import { useState } from "react";
import "./SortButtons.css";

function SortButtons({ onCategorySelect }) {
  const categories = [
    "Для члена",
    "Для вагины",
    "Анальные игрушки",
    "Лубриканты",
    "Страпоны",
    "Эротическое белье",
    "Возбудители",
    "Феромоны",
    "Презервативы",
    "БДСМ и фетиш",
    "Ролевые игры",
    "Все для массажа",
  ];

  return (
    <div className="align-category">
      <button className="category-btn" onClick={() => onCategorySelect("")}>
        <h1>Категории</h1>
      </button>

      <div className="category-container">
        {categories.map((category) => (
          <button
            key={category}
            className="category-switcher-btn"
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SortButtons;
