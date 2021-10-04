import { useHistory, useLocation } from "react-router";
import AgeFilter from "./AgeFilter";
import classes from "./Filters.module.css";
import InterestsFilter from "./InterestsFilter";
import LocFilter from "./LocFilter";
import ScoreFilter from "./ScoreFilter";
import SortFilter from "./SortFilter";

const Filters = (props) => {
  const loc = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(loc.search);

  const removeFilters = () => {
    queryParams.delete("minAge");
    queryParams.delete("maxAge");
    queryParams.delete("minScore");
    queryParams.delete("maxScore");
    queryParams.delete("minDist");
    queryParams.delete("maxDist");
    const queries = queryParams.toString();
    props.onChangeFilter("?" + queries);
    history.push({
      pathname: loc.pathname,
      search: queries,
    });
  };
  return (
    <>
      <div className={classes.label}>
        <h1>Filters</h1>
        <div onClick={removeFilters}>Remove all filters &times;</div>
      </div>
      <div className={classes.filters}>
        <AgeFilter onChangeFilter={props.onChangeFilter} />
        <ScoreFilter onChangeFilter={props.onChangeFilter} />
        <LocFilter onChangeFilter={props.onChangeFilter} />
        <SortFilter onChangeFilter={props.onChangeFilter} />
        <InterestsFilter />
      </div>
    </>
  );
};

export default Filters;
