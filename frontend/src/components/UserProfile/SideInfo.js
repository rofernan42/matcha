import classes from "./UserProfile.module.css";
import profil from "../../images/blank-profile-picture.jpg";
import heart from "../../images/heart.png";
import heartFull from "../../images/heart-full.png";
import block from "../../images/block.png";
import report from "../../images/report.png";
import { url } from "../../util/utils";
import { useEffect } from "react";
import { useState } from "react";
import ReactTimeago from "react-timeago";

const SideInfo = (props) => {
  const [online, setOnline] = useState(false);
  useEffect(() => {
    setOnline(
      props.onlineUsers.some((e) => e.userId === props.params.userId.toString())
    );
  }, [props.onlineUsers, props.params.userId]);
  return (
    <div className={classes.userInfo}>
      <div className={classes.infoField}>
        <div>
          {props.user.images.length === 0 && (
            <img className={classes.avatar} alt="" src={profil} />
          )}
          {props.user.images.length > 0 && (
            <div
              className={classes.avatar}
              style={{ backgroundImage: `url(${url + props.user.images[0]})` }}
              onClick={props.onSetImgSlider}
            >
              <div>
                <span
                  className={`${classes.status} ${
                    online ? classes.green : classes.orange
                  }`}
                ></span>
                {online && (
                  <span className={classes["status-label"]}>online</span>
                )}
                {!online && (
                  <span className={classes["status-label"]}>
                    {props.user.lastConnection && (
                      <ReactTimeago date={props.user.lastConnection} />
                    )}
                    {!props.user.lastConnection && (
                      <span className={classes["status-label"]}>offline</span>
                    )}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className={classes.nameField}>
            <div className={classes.label}>Full name</div>
            <div>
              {props.user.name} {props.user.lastname}
            </div>
          </div>
        </div>
        <div className={classes.nameField}>Score</div>
        <div className={classes.icons}>
          {!props.user.likesMe && (
            <img className={classes.icon} alt="" src={heart} />
          )}
          {props.user.likesMe && (
            <img className={classes.icon} alt="" src={heartFull} />
          )}
          <img
            className={classes.icon}
            alt=""
            src={block}
            onClick={props.onBlock}
            style={{ cursor: "pointer" }}
          />
          <img
            className={classes.icon}
            alt=""
            src={report}
            onClick={props.onReport}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SideInfo;
