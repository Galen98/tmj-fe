export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  maxVisiblePages = 5,
}) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];

    // Jika jumlah halaman sedikit, tampilkan semua
    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    // Selalu tampilkan halaman pertama
    pages.push(1);

    const startPage = Math.max(
      2,
      currentPage - Math.floor(maxVisiblePages / 2)
    );

    const endPage = Math.min(
      totalPages - 1,
      startPage + maxVisiblePages - 1
    );

    // Ellipsis setelah halaman pertama
    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Ellipsis sebelum halaman terakhir
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Selalu tampilkan halaman terakhir
    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-center">

        {/* Previous */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {/* Pages */}
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <li
                key={`ellipsis-${index}`}
                className="page-item disabled"
              >
                <span className="page-link">...</span>
              </li>
            );
          }

          return (
            <li
              key={page}
              className={`page-item ${
                currentPage === page ? "active" : ""
              }`}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Next */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>

      </ul>
    </nav>
  );
}