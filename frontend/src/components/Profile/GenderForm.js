import { useState } from "react";

const GenderForm = (props) => {
  const [checkedGender, setChecked] = useState(props.user.gender);
  const genderHandler = (e) => {
    const genderData = e.target.value;
    setChecked(genderData);
    props.onChangeGender(genderData);
  };

  return (
    <div>
      <input
        type="radio"
        value="male"
        id="male"
        name="gender"
        checked={checkedGender === "male"}
        onChange={genderHandler}
      />
      <label htmlFor="male">Male</label>
      <input
        type="radio"
        value="female"
        id="female"
        name="gender"
        checked={checkedGender === "female"}
        onChange={genderHandler}
      />
      <label htmlFor="female">Female</label>
      <input
        type="radio"
        value="other"
        id="other"
        name="gender"
        checked={checkedGender === "other"}
        onChange={genderHandler}
      />
      <label htmlFor="other">Other</label>
    </div>
  );
};

export default GenderForm;
