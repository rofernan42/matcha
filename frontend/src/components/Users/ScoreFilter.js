import { useState } from "react";
import classes from "./Filters.module.css";

const ScoreFilter = (props) => {
  const [filterByScore, setFilterByScore] = useState(false);

  const activateFilterScore = () => {
    setFilterByScore((prev) => {
      props.queryParams.delete("minScore");
      props.queryParams.delete("maxScore");
      return !prev;
    });
  };
  return (
    <>
      <div
        className={`${classes.label} ${filterByScore ? classes.selected : ""}`}
        onClick={activateFilterScore}
      >
        Filter by age
      </div>
      {filterByScore && (
        <div className={classes.filterFields}>
          <input
            type="number"
            placeholder="min"
            min={0}
            max={10}
            onChange={props.onChangeMinScore}
          />
          <input
            type="number"
            placeholder="max"
            min={0}
            max={10}
            onChange={props.onChangeMaxScore}
          />
        </div>
      )}
    </>
  );
};

export default ScoreFilter;
