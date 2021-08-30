import classes from "./ProfileCard.module.css";
import quotes from "../../images/left-quotes-sign.png";
import ImageSlider from "./ImageSlider";
import useHttp from "../../hooks/use-http";
import { updateUser } from "../../util/usersReq";
import { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import { store } from "react-notifications-component";
import socket from "../../util/socket";
import LikeButton from "./LikeButton";

const ProfileCard = (props) => {
  const { sendReq: sendUpdate } = useHttp(updateUser, true);
  const [liked, setLiked] = useState(props.liked);
  const closeProfile = () => {
    props.onCloseProfile();
  };
  const sendLikeHandler = () => {
    sendUpdate({
      token: props.token,
      toUpdate: props.user._id,
      path: "send-like",
    });
    setLiked(() => {
      return !liked;
    });
  };
  useEffect(() => {
    socket.off("newMatch").on("newMatch", (data) => {
      if (data.match) {
        store.addNotification({
          title: "You have a new match!",
          message: data.message,
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
  return (
    <>
      <div className={classes.background} onClick={closeProfile} />
      <div className={classes.card}>
        <div className={classes["card-header"]}>
          <ImageSlider images={imgs} />
          <div className={classes["card-header-bar"]}>
            <a href="/" className={classes["btn-message"]}>
              <span className={classes["sr-only"]}>Message</span>
            </a>
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
          </div>
          
        </div>
        <div className={classes["card-body"]}>
          <h2 className={classes["name"]}>{props.user.username}</h2>
          <h2 className={classes["location"]}>{props.user.age && <>{props.user.age} yo - </>}1km away</h2>
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
              <span className={classes["label"]}>Likes you</span>
              <span className={classes["value"]}></span>
            </div>
            <div className={classes["stat"]}>
              <span className={classes["label"]}>Block</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
