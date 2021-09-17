import classes from "./Chat.module.css";
import settings from "../../images/settings.png";
import { useState } from "react";
import { url } from "../../util/usersReq";
import { Link } from "react-router-dom";

const ChatHeader = (props) => {
  const [userSettings, setUserSettings] = useState(false);
  return (
    <>
      <div className={classes.userInfo}>
        <div className={classes.username}>
          <img alt="" src={`${url}${props.imgProfile}`} />
          {props.user.username}
        </div>
        <Link className={classes.linkProfile} to={`/users/${props.user._id}`}>see profile</Link>
        <img
          alt=""
          src={settings}
          className={classes.settingsImg}
          onClick={() => setUserSettings((prev) => !prev)}
        />
      </div>
      <div
        className={`${classes.userSettings} ${
          userSettings ? classes.active : ""
        }`}
      >
        <div onClick={props.onBlockModal}>Block</div>-
        <div onClick={props.onReportModal}>Report</div>-
        <div onClick={props.onCancelModal}>Cancel match</div>
      </div>
    </>
  );
};

export default ChatHeader;
