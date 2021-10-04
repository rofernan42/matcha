import { TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../../util/usersReq";
import classes from "./Interests.module.css";

const InterestsForm = (props) => {
  const [addActive, setAddActive] = useState(false);
  const [interests, setInterests] = useState(props.interests);
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
    try {
      if (addActive) {
        const res = await updateUser({
          toUpdate: int,
          path: "add-interest",
          token: props.token,
        });
        setInterests(res.interests.split(";"));
        setAddActive(false);
        setInt("");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
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
      <form className={classes.interestsForm} onSubmit={InterestsHandler}>
        <TextField
          fullWidth
          id="standard-basic"
          color={"secondary"}
          label="My interests"
          variant="standard"
          onChange={addBtnHandler}
          value={int}
        />
        <button
          id="add"
          name="add"
          className={`${classes.btnPlus} ${addActive ? classes.active : ""}`}
        >
          +
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
