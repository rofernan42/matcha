import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Slider } from "@mui/material";
import classes from "./Filters.module.css";

const marks = [
  {
    value: 0,
    label: "0+",
  },
  {
    value: 1,
    label: "100+",
  },
  {
    value: 2,
    label: "200+",
  },
  {
    value: 3,
    label: "300+",
  },
  {
    value: 4,
    label: "400+",
  },
  {
    value: 5,
    label: "500+",
  },
];

const ScoreFilter = (props) => {
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const [value, setValue] = useState([
    +queryParams.get("minScore") || 0,
    +queryParams.get("maxScore") || 5,
  ]);
  const history = useHistory();

  const changeScoreFilter = () => {
    queryParams.set("minScore", value[0]);
    queryParams.set("maxScore", value[1]);
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
      Score range
      <div style={{ marginBottom: "10px" }}>
        <Slider
          sx={{ marginBottom: "10px" }}
          getAriaLabel={() => "Score range"}
          min={0}
          max={5}
          value={value}
          onChange={handleChange}
          onChangeCommitted={changeScoreFilter}
          valueLabelDisplay="auto"
          color={"secondary"}
          step={1}
          marks={marks}
        />
      </div>
    </div>
  );
};

export default ScoreFilter;
