import { useEffect, useState } from "react";
import { fetchMatches } from "../../util/chatsReq";
import Convo from "./Convo";
import classes from "./Convos.module.css";

const Convos = (props) => {
  const [matches, setMatches] = useState(props.matches);
  const filterConvosHandler = async (query) => {
    const data = await fetchMatches({
      token: props.token,
      path: `chat/matches${query}`,
    });
    setMatches(data.matches);
  };
  useEffect(() => {
    setMatches(props.matches);
  }, [props.matches]);
  return (
    <div className={classes.convos}>
      <div className={classes.wrapper}>
        <div className={classes.typeConvos}>
          <div
            // className={`${classes.selected}`}
            onClick={() => filterConvosHandler("")}
          >
            all
          </div>
          <div
            // className={`${classes.selected}`}
            onClick={() => filterConvosHandler("?unread=true")}
          >
            unread
          </div>
        </div>
        {matches && matches.map((match) => {
          const imgProfile = match.user.images.find((img) => img !== null);
          return (
            <Convo
              key={match.match._id}
              match={match}
              currentRoom={props.room && props.room.match._id}
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
