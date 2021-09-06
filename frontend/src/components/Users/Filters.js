import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Select from "react-select";
import AgeFilter from "./AgeFilter";
import classes from "./Filters.module.css";
import LocFilter from "./LocFilter";
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

  const options = [
    { label: "Sort by location", value: "location" },
    { label: "Sort by age", value: "age" },
    { label: "Sort by popularity", value: "popularity" },
  ];
  const typeSortAge = [
    { label: "Youngest to oldest", value: "ageIncrease" },
    { label: "Oldest to youngest", value: "ageDecrease" },
  ];
  const typeSortPopularity = [
    { label: "Most to least popular", value: "scoreDecrease" },
    { label: "Least to most popular", value: "scoreIncrease" },
  ];
  const changeSort = (e) => {
    setSortBy(e.value);
  };

  const changeSortOrder = (e) => {
    queryParams.set("sort", e.value);
  };

  const changeFilter = (e, query) => {
    queryParams.set(query, e.target.value);
  };

  const applyFilters = (e) => {
    e.preventDefault();
    if (sortBy === "location") {
      queryParams.delete("sort");
    }
    const queries = queryParams.toString();
    history.push({
      pathname: loc.pathname,
      search: queries,
    });
  };
  return (
    <>
      <div className={classes.filters}>
        <AgeFilter
          queryParams={queryParams}
          onChangeMinAge={(e) => changeFilter(e, "minAge")}
          onChangeMaxAge={(e) => changeFilter(e, "maxAge")}
        />
      </div>
      <div className={classes.filters}>
        <ScoreFilter
          queryParams={queryParams}
          onChangeMinScore={(e) => changeFilter(e, "minScore")}
          onChangeMaxScore={(e) => changeFilter(e, "maxScore")}
        />
      </div>
      <div className={classes.filters}>
        <LocFilter
          queryParams={queryParams}
          onChangeMinLoc={(e) => changeFilter(e, "minDist")}
          onChangeMaxLoc={(e) => changeFilter(e, "maxDist")}
        />
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
            onChange={changeSortOrder}
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
