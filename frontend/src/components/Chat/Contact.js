import classes from "./Room.module.css";
import { url } from "../../util/usersReq";

const Contact = (props) => {
  return (
    <li>
      <img
        src={`${url}${props.imgProfile}`}
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
