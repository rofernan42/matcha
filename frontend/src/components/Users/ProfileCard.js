import classes from "./ProfileCard.module.css";
import ImageSlider from "./ImageSlider";
import { useState } from "react";
import TimeAgo from "react-timeago";
import { calculateDistance, socket } from "../../util/utils";
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";
import heart from "../../images/heart.png";
import heartColor from "../../images/heart-color.png";
import { toast } from "react-toastify";
import { createNotification } from "../../util/notifsReq";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/currentUser-actions";
import { currentUserActions } from "../../store/currentUser-slice";

const ProfileCard = (props) => {
  const [match, setMatch] = useState(false);
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
          <div className={classes["card-header-bar"]}>
            <div className={classes["user-status"]}>
              <div
                className={`${classes.status} ${
                  props.online ? classes.green : classes.orange
                }`}
              ></div>
              {props.online && (
                <div className={classes["status-label"]}>online</div>
              )}
              {!props.online && (
                <>
                  {props.user.lastConnection && (
                    <div className={classes["status-label"]}>
                      <TimeAgo date={props.user.lastConnection} />
                    </div>
                  )}
                  {!props.user.lastConnection && (
                    <div className={classes["status-label"]}>offline</div>
                  )}
                </>
              )}
            </div>
            <div className={classes.cross} onClick={closeProfile}>
              &times;
            </div>
          </div>
          <ImageSlider
            images={props.user.images}
            width={"400px"}
            height={"250px"}
            btnSize={"40px"}
            overflowX={"hidden"}
          />
        </div>
        <div style={{ position: "absolute", top: "260px", right: "25px" }}>
          <LikeButton sendLikeHandler={sendLikeHandler} liked={props.liked} />
        </div>
        <div className={classes["card-body"]}>
          <div className={classes["name"]}>
            {props.user.username}
            {props.user.age && (
              <>
                {", "}
                {props.user.age}
              </>
            )}
          </div>
          <div className={classes["location"]}>{distance} km away</div>
          <div className={classes["bio"]}>
            {props.user.bio.length > 0 && <span>{props.user.bio}</span>}
            {props.user.bio.length === 0 && (
              <span>{props.user.username} does not have a bio...</span>
            )}
          </div>
        </div>
        <div className={classes["card-footer"]}>
          <div className={classes.footerField}>Score: {props.user.score}</div>
          <div className={classes.footerField}>
            <Link to={`/users/${props.user._id}`}>Detailed profile</Link>
          </div>
          <div className={classes.footerField}>
            {props.user.likesMe && (
              <div className={classes.heartHover}>Likes you !</div>
            )}
            {!props.user.likesMe && (
              <img alt="" src={heart} className={classes.heart} />
            )}
            {props.user.likesMe && (
              <img alt="" src={heartColor} className={classes.heartColor} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
