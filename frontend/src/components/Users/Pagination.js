import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./Pagination.css";

const Pagination = (props) => {
  const history = useHistory();
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const [currentPage, setCurrentPage] = useState(+queryParams.get("page") || 1);

  const changePage = (direction) => {
    let newPage;
    if (direction === "prev") {
      newPage = +currentPage - 1;
    } else {
      newPage = +currentPage + 1;
    }
    setCurrentPage(newPage);
    history.push({
      pathname: loc.pathname,
      search: `?page=${newPage}`,
    });
  };
  return (
    <div className="paginator">
      {props.children}
      <div className="paginator__controls">
        {currentPage > 1 && (
          <button
            className="paginator__control"
            onClick={() => {
              changePage("prev");
            }}
          >
            {"<"}
          </button>
        )}
        {currentPage < props.lastPage && (
          <button className="paginator__control" onClick={() => {
            changePage("next");
          }}>
            {">"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
