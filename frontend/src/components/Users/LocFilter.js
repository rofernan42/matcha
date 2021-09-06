import { useState } from "react";
import classes from "./Filters.module.css";

const LocFilter = (props) => {
  const [filterByLoc, setFilterByLoc] = useState(false);

  const activateFilterLoc = () => {
    setFilterByLoc((prev) => {
      props.queryParams.delete("minDist");
      props.queryParams.delete("maxDist");
      return !prev;
    });
  };
  return (
    <>
      <div
        className={`${classes.label} ${filterByLoc ? classes.selected : ""}`}
        onClick={activateFilterLoc}
      >
        Filter by distance
      </div>
      {filterByLoc && (
        <div className={classes.filterFields}>
          <input
            type="number"
            placeholder="min"
            min={0}
            max={10000}
            step={1}
            onChange={props.onChangeMinLoc}
          />
          <input
            type="number"
            placeholder="max"
            min={0}
            max={10000}
            step={1}
            onChange={props.onChangeMaxLoc}
          />
        </div>
      )}
    </>
  );
};

export default LocFilter;
