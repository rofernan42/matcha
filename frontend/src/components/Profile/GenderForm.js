import { useState } from "react";
import classes from "./GenderAttr.module.css";

const GenderForm = (props) => {
  const [checkedGender, setChecked] = useState(props.gender);
  const genderHandler = (e) => {
    const genderData = e.target.value;
    setChecked(genderData);
    props.onChangeGender({ toUpdate: genderData, path: "change-gender" });
  };
  return (
    <div className={classes.genderForm}>
      <div className={classes.label}>I am a:</div>
      <div>
        <button
          value="male"
          id="male"
          name="gender"
          className={`${classes.btn} ${
            checkedGender === "male" ? classes.selected : classes.active
          }`}
          onClick={genderHandler}
        >
          Male
        </button>
        <button
          value="female"
          id="female"
          name="gender"
          className={`${classes.btn} ${
            checkedGender === "female" ? classes.selected : classes.active
          }`}
          onClick={genderHandler}
        >
          Female
        </button>
        <button
          value="other"
          id="other"
          name="gender"
          className={`${classes.btn} ${
            checkedGender === "other" ? classes.selected : classes.active
          }`}
          onClick={genderHandler}
        >
          Other
        </button>
      </div>
    </div>
  );
};

export default GenderForm;
