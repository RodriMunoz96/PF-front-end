import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ itemsPerPage, totalItems, paginate }) => {
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setActivePage(1); // Resetear la página activa al cambiar el total de ítems
  }, [totalItems]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setActivePage(pageNumber);
    paginate(pageNumber);
  };

  return (
    <Pagination>
      <Pagination.First
        onClick={() => handlePagination(1)}
        disabled={activePage === 1}
      />
      <Pagination.Prev
        onClick={() => handlePagination(activePage - 1)}
        disabled={activePage === 1}
      />

      {[...Array(totalPages).keys()].map((page) => (
        <Pagination.Item
          key={page + 1}
          active={page + 1 === activePage}
          onClick={() => handlePagination(page + 1)}
        >
          {page + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => handlePagination(activePage + 1)}
        disabled={activePage === totalPages}
      />
      <Pagination.Last
        onClick={() => handlePagination(totalPages)}
        disabled={activePage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
