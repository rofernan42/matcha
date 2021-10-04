import { useState } from "react";
import classes from "./Filters.module.css";
import { useHistory, useLocation } from "react-router";
import { Slider } from "@mui/material";

const AgeFilter = (props) => {
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const [value, setValue] = useState([
    +queryParams.get("minAge") || 18,
    +queryParams.get("maxAge") || 99,
  ]);
  const history = useHistory();

  const changeAgeFilter = () => {
    queryParams.set("minAge", value[0]);
    queryParams.set("maxAge", value[1]);
    const queries = queryParams.toString();
    props.onChangeFilter("?" + queries);
    history.push({
      pathname: loc.pathname,
      search: queries,
    });
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.ageRange}>
      Age range
      <Slider
        sx={{ marginBottom: "10px" }}
        getAriaLabel={() => "Age range"}
        min={18}
        max={99}
        value={value}
        onChange={handleChange}
        onChangeCommitted={changeAgeFilter}
        valueLabelDisplay="auto"
        color={"secondary"}
      />
    </div>
  );
};

export default AgeFilter;
