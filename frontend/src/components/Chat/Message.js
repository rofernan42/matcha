import classes from "./Chat.module.css";
import TimeAgo from "react-timeago";
import profil from "../../images/blank-profile-picture.jpg";
import { url } from "../../util/utils";

const Message = (props) => {
  return (
    <div className={`${classes.message} ${classes[props.who]}`}>
      <div className={classes.top}>
        {props.who === "you" && (
          <div className={classes.imgContainer}>
            <img
              className={classes.imgProfile}
              src={props.imgProfile ? `${url}${props.imgProfile}` : profil}
              alt=""
            />
          </div>
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
