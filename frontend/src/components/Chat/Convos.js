import { useState } from "react";
import Convo from "./Convo";
import classes from "./Convos.module.css";

const Convos = (props) => {
  return (
    <div className={classes.convos}>
      <div className={classes.wrapper}>
        {props.matches.map((match) => {
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
