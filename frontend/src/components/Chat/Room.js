import LoadingSpinner from "../ui/LoadingSpinner";
import Chat from "./Chat";
import Contacts from "./Contacts";
import Convos from "./Convos";
import Pending from "./Pending";
import classes from "./Room.module.css";

const Room = (props) => {
  return (
    <div className={classes.chatroom}>
      <Contacts matches={props.matches} onChangeRoom={props.onChangeRoom} />
      {/* {props.status === "pending" && <LoadingSpinner loadingScreen={true} />} */}
      {!props.room.roomData && <Pending />}
      {props.room.roomData && <Chat room={props.room} />}
      <Convos matches={props.matches} onChangeRoom={props.onChangeRoom} />
    </div>
  );
};

export default Room;
