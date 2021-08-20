import classes from "./Room.module.css";

const Contact = (props) => {
  return (
    <li>
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
        alt=""
      />
      <div>
        <h2>{props.username}</h2>
        <h3>
          <span className={`${classes.status} ${classes.orange}`}></span>
          offline
        </h3>
      </div>
    </li>
  );
};

export default Contact;
