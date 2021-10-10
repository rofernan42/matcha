import { useState } from "react";
import classes from "./SettingsForm.module.css";

const InterestsForm = (props) => {
  const [addActive, setAddActive] = useState(false);
  const [int, setInt] = useState("");

  const addBtnHandler = (e) => {
    setInt(e.target.value);
    if (e.target.value.length > 0) {
      setAddActive(true);
    } else {
      setAddActive(false);
    }
  };
  const InterestsHandler = async (e) => {
    e.preventDefault();
    if (addActive) {
      props.onChangeInt({
        toUpdate: int,
        path: "add-interest",
        token: props.token,
      });
      setAddActive(false);
      setInt("");
    }
  };
  const removeIntHandler = async (int) => {
    props.onChangeInt({
      toUpdate: int,
      path: "remove-interest",
      token: props.token,
    });
  };
  return (
    <div
      className={classes["edit-settings"]}
      style={{ minWidth: "fit-content" }}
    >
      <form className={classes.header} onSubmit={InterestsHandler}>
        <input
          type="text"
          placeholder="My interests..."
          onChange={addBtnHandler}
          value={int}
        />
        <div className={addActive ? classes.save : classes.loading}>
          <button
            id="add"
            name="add"
            className={`${classes.btnPlus} ${addActive ? classes.active : ""}`}
          >
            +
          </button>
        </div>
      </form>
      <div className={classes.interestsList}>
        {(!props.interests || props.interests.length === 0) && (
          <div className={classes.noInterest}>
            Add some of your interests or hobbies to find your perfect match !
            (Examples: cooking, travelling, JavaScript, piano...)
          </div>
        )}
        {props.interests &&
          props.interests.length > 0 &&
          props.interests.map(
            (int) =>
              int.length > 0 && (
                <div className={classes.interestOption} key={int}>
                  <div>#{int}</div>
                  <div
                    className={classes.intButton}
                    onClick={() => removeIntHandler(int)}
                  >
                    &times;
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default InterestsForm;
