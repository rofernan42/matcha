import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import classes from "./Filters.module.css";

const SortFilter = (props) => {
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const [value, setValue] = useState(queryParams.get("sort") || "location");
  const [order, setOrder] = useState(queryParams.get("order") || "");
  const history = useHistory();

  const setQueries = () => {
    const queries = queryParams.toString();
    props.onChangeFilter("?" + queries);
    history.push({
      pathname: loc.pathname,
      search: queries,
    });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "location") {
      queryParams.delete("sort");
      queryParams.delete("order");
      queryParams.delete("interests");
    } else {
      queryParams.set("sort", e.target.value);
      if (e.target.value === "interests") {
        queryParams.delete("order");
      } else if (e.target.value === "age" || e.target.value === "score") {
        if (order.length === 0) queryParams.set("order", "increase");
        else if (order.length > 0) queryParams.set("order", order);
      }
    }
    setQueries();
  };
  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    queryParams.set("sort", value);
    queryParams.set("order", e.target.value);
    setQueries();
  };
  return (
    <div className={classes.ageRange}>
      <FormControl color={"secondary"}>
        Sort By
        <RadioGroup row onChange={handleChange}>
          <FormControlLabel
            value="location"
            control={
              <Radio color={"secondary"} checked={value === "location"} />
            }
            label="Location"
          />
          <FormControlLabel
            value="interests"
            control={
              <Radio color={"secondary"} checked={value === "interests"} />
            }
            label="Interests"
          />
          <FormControlLabel
            value="age"
            control={<Radio color={"secondary"} checked={value === "age"} />}
            label="Age"
          />
          <FormControlLabel
            value="score"
            control={<Radio color={"secondary"} checked={value === "score"} />}
            label="Score"
          />
        </RadioGroup>
        <RadioGroup row onChange={handleOrderChange}>
          <FormControlLabel
            value="increase"
            control={
              <Radio
                size={"small"}
                color={"secondary"}
                disabled={value !== "age" && value !== "score"}
                checked={order === "increase" || order === ""}
              />
            }
            label="Increase"
          />
          <FormControlLabel
            value="decrease"
            control={
              <Radio
                size={"small"}
                color={"secondary"}
                disabled={value !== "age" && value !== "score"}
                checked={order === "decrease"}
              />
            }
            label="Decrease"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SortFilter;
