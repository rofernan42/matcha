import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./Pagination.css";

const Pagination = (props) => {
  const history = useHistory();
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const [currentPage, setCurrentPage] = useState(+queryParams.get("page") || 1);

  const changePage = (pageNb) => {
    setCurrentPage(pageNb);
    history.push({
      pathname: loc.pathname,
      search: `?page=${pageNb}`,
    });
  };
  const prevPage = (
    <button
      className="paginator__control"
      onClick={() => {
        changePage(currentPage - 1);
      }}
    >
      {currentPage - 1}
    </button>
  );
  const nextPage = (
    <button
      className="paginator__control"
      onClick={() => {
        changePage(currentPage + 1);
      }}
    >
      {currentPage + 1}
    </button>
  );
  return (
    <div className="paginator">
      {props.children}
      <div className="paginator__controls">
        {currentPage > 1 && (
          <button
            className="paginator__control"
            onClick={() => {
              changePage(1);
            }}
          >
            1
          </button>
        )}
        {currentPage > 3 && (
          <>...</>
        )}
        {currentPage > 2 && prevPage}
        <button className="paginator__control active">{currentPage}</button>
        {currentPage < props.lastPage - 1 && nextPage}
        {currentPage < props.lastPage - 2 && (
          <>...</>
        )}
        {currentPage < props.lastPage && (
          <button
            className="paginator__control"
            onClick={() => {
              changePage(props.lastPage);
            }}
          >
            {props.lastPage}
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
