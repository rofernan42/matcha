import classes from "./Chat.module.css";

const Message = (props) => {
  return (
    <div className={`${classes.message} ${classes[props.who]}`}>
      <div className={classes.top}>
        <img className={classes.imgProfile} src={props.imgProfile} alt="" />
        <p className={classes.content}>{props.msg.content}</p>
      </div>
      <div className={classes.bottom}>1 hour ago</div>
    </div>
    // <li className={classes[`${props.who}`]}>
    //   <div className={classes.entete}>
    //     <span className={`${classes.status} ${classes.green}`}></span>
    //     <h2>{props.msg.creator}</h2>
    //     <h3>{props.msg.created_at}</h3>
    //   </div>
    //   <div className={classes.triangle}></div>
    //   <div className={classes.message}>
    //     {props.msg.content}
    //   </div>
    // </li>
  );
};

export default Message;
