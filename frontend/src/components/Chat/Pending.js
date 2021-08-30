import { Link } from "react-router-dom";
import classes from "./Chat.module.css";

const Pending = (props) => {
  return (
    <div className={classes.room}>
      <div className={classes.wrapper}>
        <span className={classes.noMessage}>
          {props.noMatch && (
            <>
              You don't have any match yet :(
              <div style={{ fontSize: "30px", marginTop: "10px" }}>
                <Link to="/users">Click here</Link> to start searching.
              </div>
            </>
          )}
          {!props.noMatch && <>Open a conversation to start a chat.</>}
        </span>
      </div>
    </div>
  );
};

export default Pending;
