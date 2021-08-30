import { useEffect, useReducer, useState } from "react";
import classes from "./Profile.module.css";

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
    men: props.user.attrMen,
    women: props.user.attrWomen,
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
    <>
      <div>I am attracted to:</div>
      <div>
        <button
          value="men"
          id="men"
          name="attraction"
          className={`${classes.btn} ${
            checkedAttr.men
              ? `${classes.active} ${classes.selected}`
              : classes.active
          }`}
          onClick={attrHandler}
        >
          Men
        </button>
        <button
          value="women"
          id="women"
          name="attraction"
          className={`${classes.btn} ${
            checkedAttr.women
              ? `${classes.active} ${classes.selected}`
              : classes.active
          }`}
          onClick={attrHandler}
        >
          Women
        </button>
      </div>
    </>
  );
};

export default AttractionForm;
