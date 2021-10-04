import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const AgeForm = (props) => {
  const [age, setAge] = useState(props.age || "");
  const ageHandler = (e) => {
    const ageData = e.target.value;
    setAge(ageData);
    props.onChangeAge({ toUpdate: ageData, path: "change-age" });
  };
  const ageRange = Array.from({ length: 82 }, (_, i) => i + 18);
  return (
    <FormControl variant="standard" sx={{ width: "100px" }}>
      <InputLabel color={"secondary"}>My age</InputLabel>
      <Select value={age} label="My age" onChange={ageHandler} color={"secondary"}>
        <MenuItem value="">Not Specified</MenuItem>
        {ageRange.map((age) => (
          <MenuItem key={age} value={age}>
            {age}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AgeForm;
