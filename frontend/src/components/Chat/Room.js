import { Link } from "react-router-dom";
import Chat from "./Chat";
import Contacts from "./Contacts";
import Convos from "./Convos";
import classes from "./Room.module.css";

const Room = (props) => {
  return (
    <div id={classes.chatroom}>
      <Contacts users={props.users} />
      {/* <Link to="/chat/:id"><Chat /></Link> */}
      <Chat />
      <Convos />
    </div>
  );
};

export default Room;
