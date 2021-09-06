import { useState } from "react";
import classes from "./Filters.module.css";

const AgeFilter = (props) => {
  const [filterByAge, setFilterByAge] = useState(false);

  const activateFilterAge = () => {
    setFilterByAge((prev) => {
      props.queryParams.delete("minAge");
      props.queryParams.delete("maxAge");
      return !prev;
    });
  };
  return (
    <>
      <div
        className={`${classes.label} ${filterByAge ? classes.selected : ""}`}
        onClick={activateFilterAge}
      >
        Filter by age
      </div>
      {filterByAge && (
        <div className={classes.filterFields}>
          <input
            type="number"
            placeholder="min"
            min={18}
            max={99}
            onChange={props.onChangeMinAge}
          />
          <input
            type="number"
            placeholder="max"
            min={18}
            max={99}
            onChange={props.onChangeMaxAge}
          />
        </div>
      )}
    </>
  );
};

export default AgeFilter;
