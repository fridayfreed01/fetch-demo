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
    <nav className="w-full flex justify-center my-10">
      <ul className="w-1/2 flex flex-row justify-evenly justify-content-center">
        <li className="">
          <a className="" onClick={prevPage} href="#">
            Previous
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={props.currentPage == pgNumber ? "text-orange-700" : ""}
          >
            <a
              onClick={() => props.setCurrentPage(pgNumber)}
              className=""
              href="#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="">
          <a className="" onClick={nextPage} href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Paginator;
