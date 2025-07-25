import React from "react";

const ProductForm = ({ product, onChange, onFileChange, onSave, onCancel, title }) => (
  <div className="edit-container">
    <div className="edit-modal">
      <h3 className="redact-title">{title}</h3>
      <div className="section-box">
        <h2 className="section-name">Название:</h2>
        <input
          className="text-input"
          type="text"
          name="productname"
          value={product.productname || ""}
          onChange={onChange}
          placeholder="Название"
        />
      </div>
      <div className="section-box">
        <h2 className="section-name">Описание:</h2>
        <textarea
          cols="40"
          rows="5"
          name="description"
          value={product.description || ""}
          onChange={onChange}
          placeholder="Описание"
        />
      </div>
      <div className="section-box">
        <h2 className="section-name">Категория:</h2>
        {console.log(product)}
        <select
          className="text-input"
          name="category"
          value={product.category || ""}
          onChange={onChange}
        >
          <option value="">Выберите категорию</option>
          <option value="Для члена">Для члена</option>
          <option value="Для вагины">Для вагины</option>
          <option value="Анальные игрушки">Анальные игрушки</option>
          <option value="Лубриканты">Лубриканты</option>
          <option value="Страпоны">Страпоны</option>
          <option value="Эротическое белье">Эротическое белье</option>
          <option value="Возбудители">Возбудители</option>
          <option value="Феромоны">Феромоны</option>
          <option value="Презервативы">Презервативы</option>
          <option value="БДСМ и фетиш">БДСМ и фетиш</option>
          <option value="Ролевые игры">Ролевые игры</option>
          <option value="Все для массажа">Все для массажа</option>
        </select>
      </div>
      <div className="section-box" id="little-align">
        <h2 className="section-name">Цена:</h2>
        <input
          className="text-input"
          type="number"
          name="price"
          value={product.price || ""}
          onChange={onChange}
          placeholder="Цена"
        />
      </div>
      <div className="image-load-box">
        <h2 className="image-btn-name">Загрузить Изображение</h2>
        <button className="fake-btn">
          <input type="file" name="image" onChange={onFileChange} className="file-input" />
        </button>
      </div>
      <button onClick={onSave} className="save-btn">
        {title.includes("Добавление") ? "Добавить" : "Сохранить"}
      </button>
      <button onClick={onCancel} className="cancel-btn">
        Отмена
      </button>
    </div>
  </div>
);

export default ProductForm;
