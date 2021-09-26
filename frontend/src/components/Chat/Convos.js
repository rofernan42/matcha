import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Convo from "./Convo";
import classes from "./Convos.module.css";

const Convos = (props) => {
  const [matches, setMatches] = useState(props.matches);
  const history = useHistory();
  const loc = useLocation();

  useEffect(() => {
    if (loc.search === "?unread=true") {
      setMatches(
        props.matches.filter(
          (match) =>
            !match.match.msgRead &&
            match.match.msgAuthor &&
            match.match.msgAuthor !== +props.authCtx.userId
        )
      );
    } else {
      setMatches(props.matches);
    }
  }, [props.matches, loc.search, props.authCtx]);

  const filterConvosHandler = async (query) => {
    history.push({
      pathname: loc.pathname,
      search: query,
    });
    props.onGetMatches();
  };

  return (
    <div className={classes.convos}>
      <div className={classes.wrapper}>
        <div className={classes.typeConvos}>
          <div
            className={`${loc.search !== "?unread=true" ? classes.selected : ""}`}
            onClick={() => filterConvosHandler("")}
          >
            all
          </div>
          <div
            className={`${loc.search === "?unread=true" ? classes.selected : ""}`}
            onClick={() => filterConvosHandler("?unread=true")}
          >
            unread
          </div>
        </div>
        {matches &&
          matches.map((match) => {
            // const imgProfile = match.user.images.find((img) => img !== null);
            return (
              <Convo
                key={match.match._id}
                match={match}
                currentRoom={props.room && props.room.match._id}
                imgProfile={match.user.image}
                onChangeRoom={props.onChangeRoom}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Convos;
