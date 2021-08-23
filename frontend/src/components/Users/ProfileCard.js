import classes from "./ProfileCard.module.css";
import quotes from "../../images/left-quotes-sign.png";
import ImageSlider from "./ImageSlider";

const ProfileCard = (props) => {
  const closeProfile = () => {
    props.onCloseProfile();
  };
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
              {/* <span className={`${classes.status} ${classes.green}`}></span>
            <span className={classes["status-label"]}>Online</span> */}
              <span className={`${classes.status} ${classes.orange}`}></span>
              <span className={classes["status-label"]}>2h ago</span>
            </div>
          </div>

          <div className={classes["btn-follow"]}></div>
        </div>

        <div className={classes["card-body"]}>
          <h2 className={classes["name"]}>{props.user.username}</h2>
          <h2 className={classes["location"]}>1 km</h2>
          <img src={quotes} className={classes["bio-img"]} alt="" />
          <div className={classes["bio"]}>
            {props.user.bio.length > 0 && <span>{props.user.bio}</span>}
            {props.user.bio.length === 0 && (
              <span>{props.user.username} does not have a bio...</span>
            )}
          </div>
        </div>

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
