import { Link } from "react-router-dom";
import Timeago from "react-timeago";
import classes from "./NotifItem.module.css";

const NotifItem = (props) => {
  return (
    <Link to={`/users/${props.notif.from_id}`} className={classes.notifItem}>
      <div className={classes.notifItemHeader}>
        <span><b>{props.notif.notifType}</b></span>
        <span className={classes.timeAgo}>
          <Timeago date={props.notif.created_at} />
        </span>
      </div>
      <div className={classes.notifItemContent}>
        {props.notif.notifContent}
      </div>
    </Link>
  );
};

export default NotifItem;
