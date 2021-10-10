import { useRef, useState } from "react";
import classes from "./SettingsForm.module.css";

const BioForm = (props) => {
  const NB_CHAR = 300;
  const [saveActive, setSaveActive] = useState(false);
  const bioRef = useRef();
  const [counter, setCounter] = useState(NB_CHAR - props.bio.length);
  const saveBtnHandler = () => {
    if (bioRef.current.value !== props.bio) {
      setSaveActive(true);
    } else {
      setSaveActive(false);
    }
    setCounter(NB_CHAR - bioRef.current.value.length);
  };
  const bioHandler = (e) => {
    e.preventDefault();
    if (saveActive) {
      props.onChangeBio({ toUpdate: bioRef.current.value, path: "change-bio" });
      setSaveActive(false);
    }
  };
  return (
    <div
      className={classes["edit-settings"]}
      style={{ minWidth: "fit-content" }}
    >
      <div className={classes.header}>
        <div className={classes.headerLabel}>About myself</div>
        <div
          className={saveActive ? classes.save : classes.loading}
          onClick={bioHandler}
        >
          Save changes
        </div>
      </div>
      <div className={classes.bioField}>
        <textarea
          type="textarea"
          maxLength={NB_CHAR}
          defaultValue={props.bio}
          onChange={saveBtnHandler}
          ref={bioRef}
          placeholder="Type something..."
        />
        <div className={classes.counter}>{counter} characters left</div>
      </div>
    </div>
  );
};

export default BioForm;
