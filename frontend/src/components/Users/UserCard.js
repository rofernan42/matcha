import { url } from "../../util/usersReq";
import classes from "./UserCard.module.css";

const UserCard = (props) => {
  const displayProfile = () => {
    props.onProfileCard(props.user);
  };
  const imgProfile = props.user.images.find((img) => img !== null);
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
        <div className={classes["profile-username"]}>{props.user.username}</div>
        <div className={classes["profile-location"]}>1 km away</div>
        {/* <div className={classes["profile-icons"]}>
          <a href="#">
            <i className={classes["fa fa-facebook"]}></i>
          </a>
          <a href="#">
            <i className={classes["fa fa-twitter"]}></i>
          </a>
          <a href="#">
            <i className={classes["fa fa-linkedin"]}></i>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default UserCard;
