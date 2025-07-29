import { useState } from "react";
import "./SortButtons.css";

import arrow from "../../assets/arrow.png";

function SortButtons({ onCategorySelect, showCategory, setShowCategory }) {
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

  const visibleCategory = showCategory ? `category-container show` : `category-container hide`;
  const rotateArrow = showCategory ? `arrow` : `arrow  rotate`;

  return (
    <div className="align-category">
      <button className="category-btn" onClick={() => setShowCategory(!showCategory)}>
        <h1>Категории</h1>
        <img src={arrow} className={rotateArrow} />
      </button>

      <div className={visibleCategory}>
        {categories.map((category) => (
          <button
            key={category}
            className="category-switcher-btn"
            onClick={() => {
              onCategorySelect(category);
              setShowCategory(!showCategory);
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SortButtons;
