import { useRef, useState } from "react";
import classes from "./Profile.module.css";

const BioForm = (props) => {
  const [saveActive, setSaveActive] = useState(false);
  const bioRef = useRef();
  const saveBtnHandler = () => {
    if (bioRef.current.value !== props.bio) {
      setSaveActive(true);
    } else {
      setSaveActive(false);
    }
  };
  const bioHandler = (e) => {
    e.preventDefault();
    props.onChangeBio(bioRef.current.value);
    setSaveActive(false);
  };
  return (
    <>
      <div>About myself:</div>
      <form onSubmit={bioHandler}>
        <textarea
          type="textarea"
          rows="7"
          cols="35"
          defaultValue={props.bio}
          onChange={saveBtnHandler}
          ref={bioRef}
        />
        <button
          id="save"
          name="save"
          className={`${classes.btn} ${saveActive ? classes.active : ""}`}
        >
          Save
        </button>
      </form>
    </>
  );
};

export default BioForm;
