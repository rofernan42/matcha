import Chat from "./Chat";
import Contacts from "./Contacts";
import classes from "./Room.module.css";

const Room = (props) => {
  return (
    <div id={classes.chatroom}>
      <Contacts users={props.users} />
      <Chat />
    </div>
  );
};

export default Room;
