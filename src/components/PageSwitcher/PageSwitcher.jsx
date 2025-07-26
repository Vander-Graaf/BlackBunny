import "./PageSwitcher.css";

function PageSwitcher({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="align-btns">
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "active-btn" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default PageSwitcher;
