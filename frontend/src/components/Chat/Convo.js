import { url } from "../../util/usersReq";
import classes from "./Convos.module.css";

const Convo = (props) => {
  const changeRoomHandler = () => {
    props.onChangeRoom(props.matchId, props.user);
  };
  return (
    <div className={classes.convo} onClick={changeRoomHandler}>
      <img
        className={classes.imgProfile}
        src={`${url}${props.imgProfile}`}
        alt=""
      />
      <div className={classes.lastMessage}>coucouuuuuuuuuuuuu</div>
    </div>
  );
};

export default Convo;
