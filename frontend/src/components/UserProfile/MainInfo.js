import classes from "./UserProfile.module.css";
import { useDispatch } from "react-redux";
import heartColor from "../../images/heart-color.png";
import LikeButton from "../Users/LikeButton";
import { userAction } from "../../store/currentUser-actions";
import { currentUserActions } from "../../store/currentUser-slice";
import { toast } from "react-toastify";
import { useState } from "react";
import { calculateDistance } from "../../util/utils";

const MainInfo = (props) => {
  const [match, setMatch] = useState(props.user.matchedMe);
  const dispatch = useDispatch();
  const currentUser = props.currentUser;

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
    <div className={classes.userDetails}>
      <div className={classes.descriptionField}>
        <div className={classes.usernameField}>
          {props.user.username}
          {props.user.age ? `, ${props.user.age}` : ""}
        </div>
        <div className={classes.distanceField}>
          {calculateDistance(
            currentUser.lat,
            props.user.lat,
            currentUser.lon,
            props.user.lon
          )}
          {" km away"}
        </div>
        {props.user.bio.length > 0 && (
          <div style={{ fontSize: "20px" }}>{props.user.bio}</div>
        )}
        {props.user.bio.length === 0 && (
          <div style={{ fontSize: "20px", color: "#979797" }}>
            {props.user.username} does not have a bio...
          </div>
        )}
      </div>
      <div className={classes.descriptionField}>
        <div className={classes.usernameField} style={{ marginBottom: "20px" }}>
          Interests
        </div>
        {!props.user.interests && (
          <div style={{ fontSize: "20px", color: "#979797" }}>
            {props.user.username} does not have interests...
          </div>
        )}
        {props.user.interests && (
          <div className={classes.intField}>
            {props.user.interests.map(
              (int) =>
                int.length > 0 && (
                  <div className={classes.interestOption} key={int}>
                    #{int}
                  </div>
                )
            )}
          </div>
        )}
      </div>
      <div className={classes.additional}>
        {/* <div>
          <div className={classes.label}>Score</div>
          <div className={classes.score}>
            <span className={classes.num}>{props.user.score}</span>
            <span className={classes.denum}>5</span>
          </div>
        </div> */}
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
            <div>
              You matched with {props.user.username}
              {/* <img alt="" src={heartColor} className={classes.matchHeart} /> */}
            </div>
            <div className={classes.cancelMatch} onClick={props.onCancel}>
              &times; Cancel match
            </div>
          </div>
        )}
      </div>
      {/* <Footer
        currentUser={currentUser}
        user={props.user}
        params={props.params}
        onlineUsers={props.onlineUsers}
      /> */}
    </div>
  );
};

export default MainInfo;
