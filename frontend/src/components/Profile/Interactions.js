import Blocked from "./Blocked";
import Likes from "./Likes";
import Visits from "./Visits";
import classes from "./Profile.module.css";

const Interactions = (props) => {
  return (
    <div className={classes.profilePage}>
      <Visits token={props.token} />
      <div className={classes.interactionsField}>
        <Likes token={props.token} />
        <Blocked token={props.token} />
      </div>
    </div>
  );
};

export default Interactions;
