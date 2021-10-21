import { useEffect, useState } from "react";
import { fetchNotifs } from "../../util/notifsReq";
import NotifItem from "./NotifItem";
import classes from "./Profile.module.css";

const AllNotifs = (props) => {
  const [notifs, setNotifs] = useState();
  useEffect(() => {
    const getMatchesNotifs = async () => {
      try {
        const notifsData = await fetchNotifs({
          token: props.token,
          path: "notifications",
        });
        setNotifs(notifsData);
      } catch (err) {
        console.log(err);
      }
    };
    getMatchesNotifs();
  }, [props.token]);
  return (
    <div className={classes.profilePage}>
      <div className={classes.notifsField}>
        <div style={{ fontSize: "30px" }}>Notifications</div>
        {notifs &&
          notifs.map((notif) => <NotifItem key={notif._id} notif={notif} />)}
      </div>
    </div>
  );
};

export default AllNotifs;
