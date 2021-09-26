import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortFilter = () => {
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const [value, setValue] = useState(queryParams.get("sort") || "location");
  const [order, setOrder] = useState(queryParams.get("order") || "");
  const history = useHistory();

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "location") {
      queryParams.delete("sort");
      queryParams.delete("order");
      const queries = queryParams.toString();
      history.push({
        pathname: loc.pathname,
        search: queries,
      });
    } else {
        console.log(e.target.value)
      queryParams.set("sort", e.target.value);
      if (order.length > 0) {
        queryParams.set("order", order);
        const queries = queryParams.toString();
        history.push({
          pathname: loc.pathname,
          search: queries,
        });
      }
    }
  };
  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    queryParams.set("sort", value);
    queryParams.set("order", e.target.value);
    const queries = queryParams.toString();
    history.push({
      pathname: loc.pathname,
      search: queries,
    });
  };

  return (
    <>
      <FormControl sx={{ width: "120px", marginRight: "10px" }} fullWidth>
        <InputLabel id="sort-label">Sort by</InputLabel>
        <Select
          sx={{
            bgcolor: "white",
            height: "58px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
          }}
          labelId="sort-label"
          id="sort-select"
          value={value}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"location"}>Location</MenuItem>
          <MenuItem value={"age"}>Age</MenuItem>
          <MenuItem value={"score"}>Score</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{ width: "120px" }}
        disabled={!(value === "age" || value === "score")}
      >
        <InputLabel id="order-label">Order</InputLabel>
        <Select
          sx={{
            bgcolor: "white",
            height: "58px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
          }}
          labelId="order-label"
          id="order-select"
          value={order}
          label="Age"
          onChange={handleOrderChange}
        >
          <MenuItem value={"increase"}>Increase</MenuItem>
          <MenuItem value={"decrease"}>Decrease</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default SortFilter;
