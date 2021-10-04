import classes from "./Nav.module.css";
import Timeago from "react-timeago";
import { useEffect, useState } from "react";

const Notifs = (props) => {
  const [notifs, setNotifs] = useState(props.notifs);

  useEffect(() => {
    setNotifs(props.notifs);
  }, [props.notifs]);

  const deleteNotif = (id) => {
    props.onDeleteNotif({ path: `notifications/${id}`, id: id });
  };

  const deleteAllNotifs = () => {
    props.onDeleteNotif({ path: "notifications-all" });
  };
  return (
    <div
      className={classes.currentUserOptions}
      onClick={(e) => e.stopPropagation()}
    >
      {notifs && notifs.length > 0 && (
        <>
          <div className={`${classes.notifOption} ${classes.titleNotifs}`}>
            <span>Notifications</span>
            <span className={classes.deleteNotif} onClick={deleteAllNotifs}>
              Delete all &times;
            </span>
          </div>
          {notifs.map((notif) => (
            <div key={notif._id} className={classes.notifOption}>
              <span className={classes.timeAgo}>
                <Timeago date={notif.created_at} />
              </span>
              <span>{notif.notifContent}</span>
              <span
                className={classes.deleteNotif}
                onClick={() => deleteNotif(notif._id)}
              >
                &times;
              </span>
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
