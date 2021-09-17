import { useEffect, useState } from "react";
import Timeago from "react-timeago";
import { calculateDistance } from "../../../util/geolocation";
import classes from "./UserProfile.module.css";

const Footer = (props) => {
  const [online, setOnline] = useState(false);
  useEffect(() => {
    setOnline(
      props.onlineUsers.some((e) => e.userId === props.params.userId.toString())
    );
  }, [props.onlineUsers, props.params.userId]);

  return (
    <div className={classes.footer}>
      <div>
        <span
          className={`${classes.status} ${
            online ? classes.green : classes.orange
          }`}
        ></span>
        {online && <span className={classes["status-label"]}>online</span>}
        {!online && (
          <span className={classes["status-label"]}>
            {props.user.lastConnection && <Timeago date={props.user.lastConnection} />}
            {!props.user.lastConnection && <span className={classes["status-label"]}>offline</span>}
          </span>
        )}
      </div>
      <div>
        {calculateDistance(
          props.currentUser.lat,
          props.user.lat,
          props.currentUser.lon,
          props.user.lon
        )}
        km away
      </div>
    </div>
  );
};

export default Footer;
