import { useState } from "react";
import classes from "./Filters.module.css";
import { Popper, Grow, Slider, Box } from "@mui/material";
import { useHistory, useLocation } from "react-router";

const LocFilter = () => {
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const [value, setValue] = useState([
    +queryParams.get("minDist") || 0,
    +queryParams.get("maxDist") || 1000,
  ]);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const changeAgeFilter = () => {
    queryParams.set("minDist", value[0]);
    queryParams.set("maxDist", value[1]);
    const queries = queryParams.toString();
    history.push({
      pathname: loc.pathname,
      search: queries,
    });
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className={classes.label} onClick={handleClick}>
        <div className={classes.labelTitle}>Location filter</div>
        <div className={classes.labelRange}>{`${value[0]}km - ${value[1]}km`}</div>
      </div>
      <Popper open={open} anchorEl={anchorEl} placement={"bottom"}>
        <Grow in={open}>
          <Box
            sx={{
              width: "200px",
              border: 0,
              boxShadow: "0 1px 6px rgba(0, 0, 0, 0.2)",
              borderRadius: "5px",
              p: 1,
              bgcolor: "background.paper",
            }}
          >
            <div className={classes.ageRange}>
              <Slider
                getAriaLabel={() => "Age range"}
                min={0}
                max={1000}
                value={value}
                onChange={handleChange}
                onChangeCommitted={changeAgeFilter}
                valueLabelDisplay="on"
                color={"secondary"}
              />
            </div>
          </Box>
        </Grow>
      </Popper>
    </>
  );
};

export default LocFilter;
