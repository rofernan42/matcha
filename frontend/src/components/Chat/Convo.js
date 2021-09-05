import { useEffect, useState } from "react";
import { url } from "../../util/usersReq";
import classes from "./Convos.module.css";
import socket from "../../util/socket";

const Convo = (props) => {
  const [data, setData] = useState(null);
  const [msgUnread, setMsgUnread] = useState(false);

  useEffect(() => {
    socket
      .off(`getMessageConvo${props.match.match._id}`)
      .on(`getMessageConvo${props.match.match._id}`, (msgReceived) => {
        setData({ content: msgReceived.text, roomId: msgReceived.roomId });
      });
    return () => {
      socket.off(`getMessageConvo${props.match.match._id}`);
    };
  });
  const changeRoomHandler = () => {
    props.onChangeRoom(props.match.match._id, props.match.user);
  };
  useEffect(() => {
    const isUnread =
      !props.match.match.msgRead &&
      props.match.match.msgAuthor === props.match.user._id;
    setMsgUnread(
      (data && data.roomId !== props.currentRoom) ||
        (isUnread && props.match.match._id !== props.currentRoom)
    );
    if (props.match.match._id === props.currentRoom) {
      setData(null);
    }
  }, [data, props.currentRoom, props.match.match._id]);

  return (
    <div className={classes.convo} onClick={changeRoomHandler}>
      <img
        className={classes.imgProfile}
        src={`${url}${props.imgProfile}`}
        alt=""
      />
      <div
        className={`${classes.lastMessage} ${msgUnread ? classes.unread : ""}`}
      >
        {data ? data.content : props.match.match.lastMessage}
      </div>
    </div>
  );
};

export default Convo;
