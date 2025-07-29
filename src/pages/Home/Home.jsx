import { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";

import SortButtons from "../../components/SortButtons/SortButtons.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import PageSwitcher from "../../components/PageSwitcher/PageSwitcher.jsx";
import loadingIcon from "../../assets/loading.svg";

import Cards from "../../components/Cards/Cards.jsx";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCategory, setShowCategory] = useState(false);

  const fetchProducts = async (page = 1, category = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/products?page=${page}&limit=10&category=${category}`
      );
      const { products, totalPages, currentPage } = response.data;

      setProducts(products);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page, category); // Здесь должен обновиться totalPages и products
  };
  // Перезапускаем загрузку при изменении страницы или категории
  useEffect(() => {
    fetchProducts(currentPage, category);
  }, [currentPage, category]);

  return (
    <>
      <div className="align-greeting">
        <div className="greeting-msgs">
          <div>
            <h1>Добро пожаловать в секс шоп </h1>
            <h2>BlackBunny!</h2>
          </div>
          <h3>Мы работаем с 10 утра до 12 ночи</h3>
        </div>
      </div>

      <SortButtons
        onCategorySelect={setCategory}
        showCategory={showCategory}
        setShowCategory={setShowCategory}
      />

      <div className="align-cards">
        {loading ? (
          <img src={loadingIcon} alt="Loading..." className="loading-message" />
        ) : products.length > 0 ? (
          <Cards products={products} />
        ) : (
          <p className="no-items-msg-h">Нет доступных товаров.</p>
        )}
      </div>
      <PageSwitcher
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer></Footer>
    </>
  );
}

export default Home;
