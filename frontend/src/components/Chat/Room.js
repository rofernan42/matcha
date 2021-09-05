import Chat from "./Chat";
import Contacts from "./Contacts";
import Convos from "./Convos";
import Pending from "./Pending";
import classes from "./Room.module.css";

const Room = (props) => {
  return (
    <div className={classes.chatroom}>
      <Contacts
        matches={props.matches}
        onChangeRoom={props.onChangeRoom}
        onlineUsers={props.onlineUsers}
      />
      {!props.room.roomData && <Pending noMatch={!props.matches || props.matches.length === 0} />}
      {props.room.roomData && <Chat room={props.room} onUpdateConvos={props.onUpdateConvos} />}
      <Convos token={props.token} matches={props.matches} room={props.room.roomData} onChangeRoom={props.onChangeRoom} />
    </div>
  );
};

export default Room;
