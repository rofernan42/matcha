import { useState } from "react";
import Select from "react-select";

const colourStyles = {
  option: (base, state) => ({
    ...base,
    width: "200px",
    color: "white",
    backgroundColor: state.isFocused ? "#525252" : "",
  }),
  control: (base) => ({
    ...base,
    width: "200px",
    border: "none",
    borderRadius: "0",
    backgroundColor: "#525252",
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
  menu: (base) => ({
    ...base,
    width: "200px",
    margin: "0",
    backgroundColor: "#332e36",
    borderRadius: "none",
  }),
};

const AgeForm = (props) => {
  const [age, setAge] = useState(props.age);
  const ageHandler = (e) => {
    const ageData = e.value;
    setAge(ageData);
    props.onChangeAge({ toUpdate: ageData, path: "change-age" });
  };
  const ages = [{ value: null, label: "Select age" }];
  for (let i = 18; i < 100; i++) {
    ages.push({ value: i, label: i });
  }
  return (
    <>
      <div>My age:</div>
      <Select
        styles={colourStyles}
        onChange={ageHandler}
        options={ages}
        value={ages.value}
        defaultValue={!age ? ages[0] : ages[age - 17]}
      />
    </>
  );
};

export default AgeForm;
