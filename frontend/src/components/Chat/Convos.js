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
              key={match.user._id}
              matchId={match.matchId}
              imgProfile={imgProfile}
              user={match.user}
              onChangeRoom={props.onChangeRoom}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Convos;
