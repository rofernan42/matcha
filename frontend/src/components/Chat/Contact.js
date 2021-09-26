import classes from "./Contacts.module.css";
import { url } from "../../util/usersReq";
import profil from "../../images/blank-profile-picture.jpg";

const Contact = (props) => {
  const changeRoomHandler = () => {
    props.onChangeRoom(props.matchId, props.user);
  };
  return (
    <div className={classes.contact} onClick={changeRoomHandler}>
      <img
        className={classes.imgProfile}
        src={props.imgProfile ? `${url}${props.imgProfile}` : profil}
        alt=""
      />
      <div className={classes.username}>{props.user.username}</div>
      <span className={`${classes.status} ${props.online ? classes.green : classes.orange}`}></span>
    </div>
  );
};

export default Contact;
