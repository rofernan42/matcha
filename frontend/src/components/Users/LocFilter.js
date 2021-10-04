import { useState } from "react";
import classes from "./Filters.module.css";
import { Slider } from "@mui/material";
import { useHistory, useLocation } from "react-router";

const LocFilter = (props) => {
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const [value, setValue] = useState([
    +queryParams.get("minDist") || 0,
    +queryParams.get("maxDist") || 1000,
  ]);
  const history = useHistory();

  const changeLocFilter = () => {
    queryParams.set("minDist", value[0]);
    queryParams.set("maxDist", value[1]);
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
      Location range (km)
      <Slider
        sx={{ marginBottom: "10px" }}
        getAriaLabel={() => "Age range"}
        min={0}
        max={1000}
        value={value}
        onChange={handleChange}
        onChangeCommitted={changeLocFilter}
        valueLabelDisplay="auto"
        color={"secondary"}
      />
    </div>
  );
};

export default LocFilter;
