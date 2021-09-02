import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Select from "react-select";
import AgeFilter from "./AgeFilter";
import classes from "./Filters.module.css";
import ScoreFilter from "./ScoreFilter";

const colourStyles = {
  option: (base, state) => ({
    ...base,
    fontSize: "14px",
    // width: "200px",
    // color: "white",
    // backgroundColor: state.isFocused ? "#525252" : "",
  }),
  control: (base) => ({
    ...base,
    // width: "200px",
    border: "none",
    borderRadius: "0",
    height: "100%",
    // backgroundColor: "#525252",
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: "14px",
    // color: "white",
  }),
  menu: (base) => ({
    ...base,
    // width: "200px",
    // margin: "0",
    // backgroundColor: "#332e36",
    borderRadius: "none",
  }),
};

const Filters = () => {
  const history = useHistory();
  const loc = useLocation();
  const [sortBy, setSortBy] = useState(null);
  const queryParams = new URLSearchParams(loc.search);
  //   const [queries, setQueries] = useState(loc.search);

  //   const [currentPage, setCurrentPage] = useState(+queryParams.get("page") || 1);

  const options = [
    { label: "Sort by location", value: "location" },
    { label: "Sort by age", value: "age" },
    { label: "Sort by popularity", value: "popularity" },
  ];
  const typeSortAge = [
    { label: "Youngest to oldest", value: "increase" },
    { label: "Oldest to youngest", value: "decrease" },
  ];
  const typeSortPopularity = [
    { label: "Most to least popular", value: "decrease" },
    { label: "Least to most popular", value: "increase" },
  ];
  const changeSort = (e) => {
    setSortBy(e.value);
  };

  const changeMinAge = (e) => {
    queryParams.set("minAge", e.target.value);
  };
  const changeMaxAge = (e) => {
    queryParams.set("maxAge", e.target.value);
  };
  const changeMinScore = (e) => {
    queryParams.set("minScore", e.target.value);
  };
  const changeMaxScore = (e) => {
    queryParams.set("maxScore", e.target.value);
  };
  const changeLoc = (e) => {
    queryParams.set("loc", e.target.value);
  }

  const applyFilters = (e) => {
    e.preventDefault();
    const queries = queryParams.toString();
    console.log(queries);
    history.push({
      pathname: loc.pathname,
      search: queries,
    });
  };
  return (
    <>
      <div className={classes.filters}>
        <AgeFilter queryParams={queryParams} onChangeMinAge={changeMinAge} onChangeMaxAge={changeMaxAge} />
      </div>
      <div className={classes.filters}>
        <ScoreFilter queryParams={queryParams} onChangeMinScore={changeMinScore} onChangeMaxScore={changeMaxScore} />
      </div>
      <div className={classes.filters}>
        <input placeholder="Search by location..." type="text" onChange={changeLoc} />
      </div>
      <div className={classes.sortMenu}>
        <Select
          styles={colourStyles}
          options={options}
          value={options.value}
          onChange={changeSort}
          defaultValue={options[0]}
        />
      </div>
      {sortBy === "age" && (
        <div className={classes.sortMenu}>
          <Select
            styles={colourStyles}
            options={typeSortAge}
            value={typeSortAge.value}
          />
        </div>
      )}
      {sortBy === "popularity" && (
        <div className={classes.sortMenu}>
          <Select
            styles={colourStyles}
            options={typeSortPopularity}
            value={typeSortPopularity.value}
          />
        </div>
      )}
      <button className={classes.applyBtn} onClick={applyFilters}>
        Apply
      </button>
    </>
  );
};

export default Filters;
