import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import classes from "./SettingsForm.module.css";

const checkedReducer = (state, action) => {
  if (action.type === "men") {
    return { men: !state.men, women: state.women };
  }
  if (action.type === "women") {
    return { men: state.men, women: !state.women };
  }
  return state;
};

const AttractionForm = (props) => {
  const [isSending, setIsSending] = useState(false);
  const [checkedAttr, dispatch] = useReducer(checkedReducer, {
    men: !!props.user.attrMen,
    women: !!props.user.attrWomen,
  });

  const attrHandler = (e) => {
    const attrData = e.target.value;
    dispatch({ type: attrData });
    setIsSending(true);
  };
  useEffect(() => {
    if (isSending) {
      props.onChangeAttr({ toUpdate: checkedAttr, path: "change-attraction" });
      setIsSending(false);
    }
  }, [props, isSending, checkedAttr]);

  return (
    <div className={classes.ageForm} style={{ flex: 1 }}>
      <div className={classes.ageHeader}>
        <div className={classes.label}>I am attracted to</div>
      </div>
      <div style={{ width: "fit-content", margin: "auto" }}>
        <FormGroup row onChange={attrHandler}>
          <FormControlLabel
            control={<Checkbox color="secondary" checked={checkedAttr.men} />}
            value="men"
            label="Men"
          />
          <FormControlLabel
            control={<Checkbox color="secondary" checked={checkedAttr.women} />}
            value="women"
            label="Women"
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default AttractionForm;
