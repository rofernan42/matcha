import classes from "./Chat.module.css";
import TimeAgo from "react-timeago";

const Message = (props) => {
  return (
    <div className={`${classes.message} ${classes[props.who]}`}>
      <div className={classes.top}>
        {props.who === "you" && (
          <img className={classes.imgProfile} src={props.imgProfile} alt="" />
        )}
        <p className={classes.content}>{props.msg.content}</p>
      </div>
      <div className={classes.bottom}>
        <TimeAgo date={props.msg.created_at} />
      </div>
    </div>
  );
};

export default Message;
