import { Checkbox, FormControlLabel, Slider } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import classes from "./SettingsForm.module.css";

const AgeForm = (props) => {
  const [disableAge, setDisableAge] = useState(props.age === null);
  const [value, setValue] = useState(props.age);

  useEffect(() => {
    if (disableAge) {
      setValue(null);
      props.onChangeAge({ toUpdate: null, path: "change-age" });
    }
  }, [disableAge, props]);

  const ageHandler = () => {
    props.onChangeAge({ toUpdate: value, path: "change-age" });
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.ageForm}>
      <div className={classes.ageHeader}>
        <div className={classes.label}>My age</div>
        <FormControlLabel
          control={
            <Checkbox
              checked={!value}
              color="default"
              onChange={() => setDisableAge((prev) => !prev)}
            />
          }
          label="Do not specify my age"
        />
      </div>
      <div className={classes.ageSlider}>
        <Slider
          sx={{ marginBottom: "10px" }}
          getAriaLabel={() => "Age range"}
          min={18}
          max={99}
          marks={[
            { value: 18, label: "18" },
            { value: 99, label: "99" },
          ]}
          value={value}
          onChange={handleChange}
          onChangeCommitted={ageHandler}
          valueLabelDisplay="auto"
          color={"secondary"}
          disabled={disableAge}
        />
      </div>
    </div>
  );
};

export default AgeForm;
