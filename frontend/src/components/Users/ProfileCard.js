import classes from "./ProfileCard.module.css";
import quotes from "../../images/left-quotes-sign.png";
import ImageSlider from "./ImageSlider";
import { url, userAction } from "../../util/usersReq";
import { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import { store } from "react-notifications-component";
import socket from "../../util/socket";
import LikeButton from "./LikeButton";
import { useHistory } from "react-router-dom";
import heart from "../../images/heart.png";
import heartColor from "../../images/heart-color.png";
import block from "../../images/block.png";
import { calculateDistance } from "../../util/geolocation";

const ProfileCard = (props) => {
  const [liked, setLiked] = useState(props.liked);
  const [match, setMatch] = useState(false);
  const history = useHistory();
  const closeProfile = () => {
    props.onCloseProfile();
  };
  const sendLikeHandler = async () => {
    try {
      const res = await fetch(url + `send-like/${props.user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      });
      const resData = await res.json();
      if (!res.ok) {
        const error = new Error("Something went wrong.");
        error.data = resData.message;
        throw error;
      }
      setLiked(() => {
        return !liked;
      });
      props.onSetLikes(resData.likes);
      if (resData.match) {
        setMatch(resData.match);
        socket.emit("newMatch", {
          userId: props.user._id,
          user1: props.user.username,
          user2: resData.currentUser,
        });
        setTimeout(() => {
          props.onCloseProfile();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
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
  useEffect(() => {
    socket.off("matchPopup").on("matchPopup", (data) => {
      if (data) {
        store.addNotification({
          title: data.message,
          message: "lalala",
          type: "info",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: false,
          },
        });
      }
    });
  }, []);
  const imgs = props.user.images.filter((img) => img !== null);
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
          <ImageSlider images={imgs} />
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
                <span className={classes["status-label"]}>
                  <TimeAgo date={props.user.lastConnection} />
                </span>
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
        <LikeButton sendLikeHandler={sendLikeHandler} liked={liked} />
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
