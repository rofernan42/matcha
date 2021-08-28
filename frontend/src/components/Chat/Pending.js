import classes from "./Chat.module.css";

const Pending = () => {
  return (
    <div className={classes.room}>
      <div className={classes.wrapper}>
        <span className={classes.noMessage}>Open a conversation to start a chat.</span>
      </div>
    </div>
  );
};

export default Pending;
