import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import classes from "./SettingsForm.module.css";

const GenderForm = (props) => {
  const [checkedGender, setChecked] = useState(props.gender);

  const genderHandler = (e) => {
    const genderData = e.target.value;
    setChecked(genderData);
    props.onChangeGender({ toUpdate: genderData, path: "change-gender" });
  };

  return (
    <div className={classes.ageForm} style={{ flex: 1 }}>
      <div className={classes.ageHeader}>
        <div className={classes.label}>I identify as</div>
      </div>
      <div style={{ width: "fit-content", margin: "auto" }}>
        <RadioGroup row onChange={genderHandler}>
          <FormControlLabel
            value="male"
            control={
              <Radio color={"secondary"} checked={checkedGender === "male"} />
            }
            label="Male"
          />
          <FormControlLabel
            value="female"
            control={
              <Radio color={"secondary"} checked={checkedGender === "female"} />
            }
            label="Female"
          />
          <FormControlLabel
            value="other"
            control={
              <Radio color={"secondary"} checked={checkedGender === "other"} />
            }
            label="Other"
          />
        </RadioGroup>
      </div>
    </div>
  );
};

export default GenderForm;
