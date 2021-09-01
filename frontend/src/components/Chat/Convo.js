// import { useEffect, useState } from "react";
import { url } from "../../util/usersReq";
import classes from "./Convos.module.css";
// import socket from "../../util/socket";

const Convo = (props) => {
//   const [data, setData] = useState(null);
//   const [lastMessage, setLastMessage] = useState(props.match.lastMessage);
//   useEffect(() => {
//     data && data.roomId === +props.match.matchId && setLastMessage(data.content);
//   }, [data, props.match.matchId]);
//   console.log(data);
  
//   console.log(lastMessage)
//   useEffect(() => {
//     socket.off("getMessage").on("getMessage", (data) => {
//         console.log(props.match.matchId)
//       setData({ content: data.text, roomId: data.fromRoom });
//     });
//   }, []);
  const changeRoomHandler = () => {
    props.onChangeRoom(props.match.matchId, props.match.user);
  };
  return (
    <div className={classes.convo} onClick={changeRoomHandler}>
      <img
        className={classes.imgProfile}
        src={`${url}${props.imgProfile}`}
        alt=""
      />
      <div className={classes.lastMessage}>{props.lastMessage}</div>
    </div>
  );
};

export default Convo;
