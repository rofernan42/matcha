import AgeFilter from "./AgeFilter";
import classes from "./Filters.module.css";
import LocFilter from "./LocFilter";
import ScoreFilter from "./ScoreFilter";
import SortFilter from "./SortFilter";

const Filters = () => {
  return (
    <>
      <div className={classes.filters}>
        <AgeFilter />
      </div>
      <div className={classes.filters}>
        <ScoreFilter />
      </div>
      <div className={classes.filters}>
        <LocFilter />
      </div>
      <div className={classes.filters}>
        <SortFilter />
      </div>
    </>
  );
};

export default Filters;
