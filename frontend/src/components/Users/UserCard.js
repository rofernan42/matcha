import { Link } from "react-router-dom";
import { calculateDistance, url } from "../../util/utils";
import classes from "./UserCard.module.css";

const UserCard = (props) => {
  const displayProfile = () => {
    props.onProfileCard(props.user);
  };
  const imgProfile = props.user.images.find((img) => img !== null);
  const distance = calculateDistance(
    props.currentLoc.lat,
    props.user.lat,
    props.currentLoc.lon,
    props.user.lon
  );
  return (
    <div className={classes.container} onClick={displayProfile}>
      <div className={classes["profile-card-2"]}>
        {imgProfile && (
          <img
            src={`${url}${imgProfile}`}
            className={`${classes["profile-img"]}`}
            alt=""
          />
        )}
        <div className={classes["profile-username"]}>
          {props.user.username}
          <div
            className={`${classes.status} ${
              props.online ? classes.green : classes.orange
            }`}
          ></div>
        </div>
        <div className={classes["profile-location"]}>
          {props.user.age && <>{props.user.age} yo - </>}
          {distance} km away
        </div>
        <div className={classes["profile-detailed"]}>
          <Link to={`/users/${props.user._id}`}>See detailed profile</Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
