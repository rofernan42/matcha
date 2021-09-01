import { useEffect, useState } from "react";
import Convo from "./Convo";
import classes from "./Convos.module.css";
// import socket from "../../util/socket";

const Convos = (props) => {
  const [matches, setMatches] = useState(props.matches);
  const currentRoom = props.room && props.room.match._id;
  const [data, setData] = useState(null);
  // const [lastMessage, setLastMessage] = useState(props.match.lastMessage);
  // useEffect(() => {
  //   data && data.roomId === +props.match.matchId && setLastMessage(data.content);
  // }, [data, props.match.matchId]);
  // useEffect(() => {
  //   socket.off("getMessage").on("getMessage", (data) => {
  //     setData({ content: data.text, roomId: data.fromRoom });
  //   });
  // }, [data]);
  // useEffect(() => {
  //   setMatches(
  //     props.matches.filter((match) => match.matchId !== currentRoom)
  //   );
  // }, [currentRoom, props.matches]);
  return (
    <div className={classes.convos}>
      <div className={classes.wrapper}>
        {props.matches.map((match) => {
          const imgProfile = match.user.images.find((img) => img !== null);
          return (
            <Convo
              key={match.matchId}
              match={match}
              lastMessage={(data && data.roomId === match.matchId && data.content) || match.lastMessage}
              currentRoom={currentRoom}
              imgProfile={imgProfile}
              onChangeRoom={props.onChangeRoom}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Convos;
