import React from "react";
interface PaginatorProps {
  nPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
export const Paginator = (props: PaginatorProps) => {
  const pageNumbers = Array.from({ length: props.nPages }, (_, i) => i + 1);

  const nextPage = () => {
    if (props.currentPage !== props.nPages)
      props.setCurrentPage(props.currentPage + 1);
  };
  const prevPage = () => {
    if (props.currentPage !== 1) props.setCurrentPage(props.currentPage - 1);
  };
  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className="page-link" onClick={prevPage} href="#">
            Previous
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${
              props.currentPage == pgNumber ? "active" : ""
            } `}
          >
            <a
              onClick={() => props.setCurrentPage(pgNumber)}
              className="page-link"
              href="#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" onClick={nextPage} href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Paginator;
