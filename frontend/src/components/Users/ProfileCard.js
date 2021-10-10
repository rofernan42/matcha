import classes from "./ProfileCard.module.css";
import quotes from "../../images/left-quotes-sign.png";
import ImageSlider from "./ImageSlider";
import { useState } from "react";
import TimeAgo from "react-timeago";
import { calculateDistance, socket } from "../../util/utils";
import LikeButton from "./LikeButton";
import { useHistory } from "react-router-dom";
import heart from "../../images/heart.png";
import heartColor from "../../images/heart-color.png";
import block from "../../images/block.png";
import { toast } from "react-toastify";
import { createNotification } from "../../util/notifsReq";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/currentUser-actions";
import { currentUserActions } from "../../store/currentUser-slice";

const ProfileCard = (props) => {
  const [match, setMatch] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const closeProfile = () => {
    props.onCloseProfile();
  };

  const sendLikeHandler = async () => {
    const data = await dispatch(
      userAction({
        path: `send-like/${props.user._id}`,
        method: "POST",
        token: props.token,
      })
    );
    dispatch(currentUserActions.setLike(props.user._id));
    if (data && data.match) {
      setMatch(true);
      toast(`You matched with ${props.user.username}!`, {
        style: { backgroundColor: "#9f5ccc", color: "white" },
      });
      await createNotification({
        token: props.token,
        type: "match",
        userId: props.user._id,
      });
      socket.emit("newMatch", {
        userId: props.user._id,
        username: props.currentUser.username,
      });
      setTimeout(() => {
        props.onCloseProfile();
      }, 1000);
    } else if (!props.liked) {
      await createNotification({
        token: props.token,
        type: "like",
        userId: props.user._id,
      });
      socket.emit("newLike", {
        userId: props.user._id,
      });
    }
  };
  const blockUserHandler = async () => {
    await userAction({
      path: `block/${props.user._id}`,
      method: "POST",
      token: props.token,
    });
    history.go(0);
  };

  const distance = calculateDistance(
    props.currentLoc.lat,
    props.user.lat,
    props.currentLoc.lon,
    props.user.lon
  );
  return (
    <>
      <div
        className={`${classes.background} ${match ? classes.bgmatch : ""}`}
        onClick={closeProfile}
      />
      <div className={`${classes.card} ${match ? classes.match : ""}`}>
        <div className={classes["card-header"]}>
          <ImageSlider images={props.user.images} />
          <div className={classes["card-header-bar"]}>
            <div className={classes["user-status"]}>
              <span
                className={`${classes.status} ${
                  props.online ? classes.green : classes.orange
                }`}
              ></span>
              {props.online && (
                <span className={classes["status-label"]}>online</span>
              )}
              {!props.online && (
                <>
                  {props.user.lastConnection && (
                    <span className={classes["status-label"]}>
                      <TimeAgo date={props.user.lastConnection} />
                    </span>
                  )}
                  {!props.user.lastConnection && (
                    <span className={classes["status-label"]}>offline</span>
                  )}
                </>
              )}
            </div>
            <div className={classes.cross} onClick={closeProfile}>
              &times;
            </div>
          </div>
        </div>
        <div className={classes["card-body"]}>
          <h2 className={classes["name"]}>{props.user.username}</h2>
          <h2 className={classes["location"]}>
            {props.user.age && <>{props.user.age} yo - </>}
            {distance} km away
          </h2>
          <img src={quotes} className={classes["bio-img"]} alt="" />
          <div className={classes["bio"]}>
            {props.user.bio.length > 0 && <span>{props.user.bio}</span>}
            {props.user.bio.length === 0 && (
              <span>{props.user.username} does not have a bio...</span>
            )}
          </div>
        </div>
        <div style={{ position: "absolute", top: "240px", right: "25px" }}>
          <LikeButton sendLikeHandler={sendLikeHandler} liked={props.liked} />
        </div>
        <div className={classes["card-footer"]}>
          <div className={classes["stats"]}>
            <div className={classes["stat"]}>
              <span className={classes["label"]}>Score</span>
              <span className={classes["value"]}></span>
            </div>
            <div className={classes["stat"]}>
              <div
                className={`${
                  props.user.likesMe
                    ? classes.likedIconTrue
                    : classes.likedIconFalse
                }`}
              >
                {!props.user.likesMe && (
                  <img alt="" src={heart} className={classes.heart} />
                )}
                {props.user.likesMe && (
                  <img
                    alt=""
                    src={heartColor}
                    className={`${classes.heart} ${classes.color}`}
                  />
                )}
                {props.user.likesMe && (
                  <span className={classes["label"]}>Likes you</span>
                )}
              </div>
            </div>
            <div className={classes["stat"]}>
              <div className={classes.blockField}>
                <img
                  alt=""
                  src={block}
                  className={classes.heart}
                  onClick={blockUserHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
