import { useState } from "react";
import classes from "./Filters.module.css";
import { useHistory, useLocation } from "react-router";
import { Popper, Grow, Slider, Box } from "@mui/material";

const AgeFilter = () => {
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const [value, setValue] = useState([
    +queryParams.get("minAge") || 18,
    +queryParams.get("maxAge") || 99,
  ]);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const changeAgeFilter = () => {
    queryParams.set("minAge", value[0]);
    queryParams.set("maxAge", value[1]);
    const queries = queryParams.toString();
    history.push({
      pathname: loc.pathname,
      search: queries,
    });
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const closeMenu = () => {
    setAnchorEl(false);
  }
  return (
    <>
    <div onClick={closeMenu}/>
      <div className={classes.label} onClick={handleClick}>
        <div className={classes.labelTitle}>Age filter</div>
        <div className={classes.labelRange}>{`${value[0]} - ${value[1]}`}</div>
      </div>
      <Popper open={open} anchorEl={anchorEl} placement={"bottom-start"}>
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
                min={18}
                max={99}
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

export default AgeFilter;
