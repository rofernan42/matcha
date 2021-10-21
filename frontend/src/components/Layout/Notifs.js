import classes from "./Nav.module.css";
import Timeago from "react-timeago";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Notifs = (props) => {
  const [notifs, setNotifs] = useState(props.notifs);

  useEffect(() => {
    setNotifs(props.notifs);
  }, [props.notifs]);

  return (
    <div
      className={classes.notifications}
      style={{ right: props.posX }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={classes.notifsHeader}>
        <span>Notifications</span>
        <span style={{ marginLeft: "20px" }}>
          <Link to="/profile#notifs">See all notifications</Link>
        </span>
      </div>
      {notifs && notifs.length > 0 && (
        <>
          {notifs.slice(0, 5).map((notif) => (
            <div key={notif._id} className={classes.notifOption}>
              <div className={classes.notifOptionHeader}>
                <span>
                  <Link to={`/users/${notif.from_id}`}>{notif.notifType}</Link>
                </span>
                <span className={classes.timeAgo}>
                  <Timeago date={notif.created_at} />
                </span>
              </div>
              <div className={classes.notifOptionContent}>
                {notif.notifContent}
              </div>
            </div>
          ))}
        </>
      )}
      {(!notifs || notifs.length === 0) && (
        <div className={`${classes.notifOption} ${classes.noNotif}`}>
          <i>No notification for now !</i>
        </div>
      )}
    </div>
  );
};

export default Notifs;
