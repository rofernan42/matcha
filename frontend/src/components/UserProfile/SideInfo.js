import classes from "./UserProfile.module.css";
import profil from "../../images/blank-profile-picture.jpg";
import heart from "../../images/heart.png";
import heartFull from "../../images/heart-full.png";
import block from "../../images/block.png";
import report from "../../images/report.png";
import { url } from "../../util/utils";
import { useEffect, useState } from "react";
import ReactTimeago from "react-timeago";
import LikeButton from "../Users/LikeButton";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { currentUserActions } from "../../store/currentUser-slice";
import { userAction } from "../../store/currentUser-actions";

const SideInfo = (props) => {
  const [match, setMatch] = useState(props.user.matchedMe);
  const [online, setOnline] = useState(false);
  const dispatch = useDispatch();
  const currentUser = props.currentUser;

  useEffect(() => {
    setOnline(
      props.onlineUsers.some((e) => e.userId === props.params.userId.toString())
    );
  }, [props.onlineUsers, props.params.userId]);

  const sendLikeHandler = async () => {
    const data = await dispatch(
      userAction({
        path: `send-like/${props.params.userId}`,
        method: "POST",
        token: props.token,
      })
    );
    dispatch(currentUserActions.setLike(props.params.userId));
    if (data && data.match) {
      setMatch(true);
      toast(`You matched with ${props.user.username}!`, {
        style: { backgroundColor: "#9f5ccc", color: "white" },
      });
      props.notification("match", "newMatch");
    } else if (!currentUser.likes.includes(+props.params.userId)) {
      props.notification("like", "newLike");
    }
  };

  return (
    <div className={classes.userInfo}>
      <div className={classes.infoField}>
        <div>
          <div
            className={classes.avatar}
            style={{
              backgroundImage: `url(${
                props.user.images.length > 0
                  ? url + props.user.images[0]
                  : profil
              })`,
            }}
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
          <div className={classes.nameField}>
            <div className={classes.label}>Full name</div>
            <div>
              {props.user.name} {props.user.lastname}
            </div>
          </div>
        </div>
        {!match && (
          <div className={classes.likeButton}>
            <LikeButton
              sendLikeHandler={sendLikeHandler}
              liked={currentUser?.likes.includes(+props.params.userId)}
            />
          </div>
        )}
        {match && (
          <div className={classes.matchField}>
            <div>You matched with {props.user.username}</div>
            <div className={classes.cancelMatch} onClick={props.onCancel}>
              &times; Cancel match
            </div>
          </div>
        )}
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
