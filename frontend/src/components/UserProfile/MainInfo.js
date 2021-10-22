import classes from "./UserProfile.module.css";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/currentUser-actions";
import { calculateDistance, socket } from "../../util/utils";
import { useEffect } from "react";
import { createNotification } from "../../util/notifsReq";

const MainInfo = (props) => {
  const dispatch = useDispatch();
  const currentUser = props.currentUser;

  useEffect(() => {
    const visitNotification = async () => {
      try {
        const data = await dispatch(
          userAction({
            path: `visit/${props.params.userId}`,
            method: "POST",
            token: props.token,
          })
        );
        if (data.firstVisit) {
          await createNotification({
            token: props.token,
            type: "visit",
            userId: props.params.userId,
          });
          socket.emit("newVisit", {
            userId: props.params.userId,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    visitNotification();
  }, [props.token, props.params.userId, dispatch]);

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
      <div className={classes.scoreField}>
        Score <b>{props.user.score}</b>
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
    </div>
  );
};

export default MainInfo;
