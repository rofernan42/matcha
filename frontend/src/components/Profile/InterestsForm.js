import { useRef, useState } from "react";
import classes from "./Profile.module.css";

const InterestsForm = (props) => {
  const [addActive, setAddActive] = useState(false);
  const intRef = useRef();
  const addBtnHandler = () => {
    if (intRef.current.value.length > 0) {
      setAddActive(true);
    } else {
      setAddActive(false);
    }
  };
  const InterestsHandler = (e) => {
    e.preventDefault();
    if (addActive) {
      props.onChangeInt({
        toUpdate: intRef.current.value,
        path: "add-interest",
      });
      setAddActive(false);
      intRef.current.value = "";
    }
  };
  const removeIntHandler = (int) => {
    props.onChangeInt({ toUpdate: int, path: "remove-interest" });
  };
  return (
    <>
      <div>My interests:</div>
      <form onSubmit={InterestsHandler}>
        <input type="text" onChange={addBtnHandler} ref={intRef} />
        <button
          id="add"
          name="add"
          className={`${classes.btn} ${addActive ? classes.active : ""}`}
        >
          Add
        </button>
      </form>
      {props.interests.map((int) => (
        <div key={int}>
          <span>#{int}</span>
          <button onClick={() => removeIntHandler(int)}>x</button>
        </div>
      ))}
    </>
  );
};

export default InterestsForm;
