import classes from "./Chat.module.css";
import settings from "../../images/settings.png";
import profil from "../../images/blank-profile-picture.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../../util/utils";

const ChatHeader = (props) => {
  const [userSettings, setUserSettings] = useState(false);
  return (
    <>
      <div className={classes.userInfo}>
        <div className={classes.username}>
          <img alt="" src={props.imgProfile ? `${url}${props.imgProfile}` : profil} />
          {" "}{props.user.username}
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
