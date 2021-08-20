import classes from "./Room.module.css";

const Message = (props) => {
  return (
    <li className={classes.you}>
      <div className={classes.entete}>
        <span className={`${classes.status} ${classes.green}`}></span>
        <h2>Vincent</h2>
        <h3>10:12AM, Today</h3>
      </div>
      <div className={classes.triangle}></div>
      <div className={classes.message}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor.
      </div>
    </li>
  );
};

export default Message;
