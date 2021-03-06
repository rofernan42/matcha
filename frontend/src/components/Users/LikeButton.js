import { useEffect, useState } from "react";
import heart from "../../images/heart.png";
import heartFull from "../../images/heart-full.png"
import classes from "./LikeButton.module.css";

const LikeButton = (props) => {
  const [btnHighlighted, setBtnHighlighted] = useState(false);
  const btnClasses = `${classes["btn-follow"]} ${
    btnHighlighted ? classes.bump : ""
  } ${props.liked ? classes["active"] : classes["inactive"]}`;
  useEffect(() => {
    if (!props.liked) {
      return;
    }
    setBtnHighlighted(true);
    const timer = setTimeout(() => {
      setBtnHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [props.liked]);
  return (
    <div className={btnClasses} onClick={props.sendLikeHandler}>
      {!props.liked && <img alt="" src={heart} className={classes.heart} />}
      {props.liked && <img alt="" src={heartFull} className={classes.heart} />}
    </div>
  );
};

export default LikeButton;
