import { useRef, useState } from "react";
import { updateUser } from "../../util/usersReq";
import classes from "./Profile.module.css";

const InterestsForm = (props) => {
  const [addActive, setAddActive] = useState(false);
  const [interests, setInterests] = useState(props.interests);
  const intRef = useRef();
  const addBtnHandler = () => {
    if (intRef.current.value.length > 0) {
      setAddActive(true);
    } else {
      setAddActive(false);
    }
  };
  const InterestsHandler = async (e) => {
    e.preventDefault();
    if (addActive) {
      const res = await updateUser({
        toUpdate: intRef.current.value,
        path: "add-interest",
        token: props.token,
      });
      setInterests(res.interests.split(";"));
      setAddActive(false);
      intRef.current.value = "";
    }
  };
  const removeIntHandler = async (int) => {
    const res = await updateUser({
      toUpdate: int,
      path: "remove-interest",
      token: props.token,
    });
    setInterests(res.interests.split(";"));
  };
  return (
    <>
      <div>My interests:</div>
      <form onSubmit={InterestsHandler}>
        <input type="text" onChange={addBtnHandler} ref={intRef} />
        <button
          id="add"
          name="add"
          className={`${classes.btn} ${
            addActive
              ? `${classes.active} ${classes.selected}`
              : classes.inactive
          }`}
        >
          Add
        </button>
      </form>
      <div className={classes.interestsList}>
        {interests.map(
          (int) =>
            int.length > 0 && (
              <div className={classes.interestOption} key={int}>
                <span>#{int}</span>
                <button onClick={() => removeIntHandler(int)}>&times;</button>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default InterestsForm;
