import { TextField } from "@mui/material";
import classes from "./Filters.module.css";

const InterestsFilter = () => {
  return (
    <div className={classes.ageRange}>
      <TextField
        fullWidth
        color={"secondary"}
        label="Interests"
        variant="outlined"
      />
    </div>
  );
};

export default InterestsFilter;
