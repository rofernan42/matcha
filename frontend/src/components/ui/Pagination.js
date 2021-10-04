import Paginate from "@mui/material/Pagination";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Pagination = (props) => {
  const history = useHistory();
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const [currentPage, setCurrentPage] = useState(+queryParams.get("page") || 1);

  const changePage = (e, pageNb) => {
    setCurrentPage(pageNb);
    queryParams.set("page", pageNb);
    const queries = queryParams.toString();
    history.push({
      pathname: loc.pathname,
      search: queries,
    });
  };
  return (
    <div style={{ width: "fit-content", margin: "auto", padding: "10px" }}>
      <Paginate
        count={props.lastPage}
        page={currentPage}
        onChange={changePage}
      />
    </div>
  );
};

export default Pagination;
