import classes from "../UserProfile/UserProfile.module.css";
import { url } from "../../util/utils";
import profil from "../../images/blank-profile-picture.jpg";
import heart from "../../images/heart.png";
import block from "../../images/block.png";
import report from "../../images/report.png";

const OwnInfo = (props) => {
  return (
    <>
      <div className={classes.userInfo}>
        <div className={classes.infoField}>
          <div>
            <div
              className={classes.avatar}
              style={{
                backgroundImage: `url(${
                  props.images.length > 0 ? url + props.images[0] : profil
                })`,
              }}
              onClick={props.onSetImgSlider}
            >
              <div>
                <span className={`${classes.status} ${classes.green}`}></span>
                <span className={classes["status-label"]}>online</span>
              </div>
            </div>
            <div className={classes.nameField}>
              <div className={classes.label}>Full name</div>
              <div>
                {props.currentUser.name} {props.currentUser.lastname}
              </div>
            </div>
          </div>
          <div className={classes.icons}>
            <img className={classes.icon} alt="" src={heart} />
            <img className={classes.icon} alt="" src={block} />
            <img className={classes.icon} alt="" src={report} />
          </div>
        </div>
      </div>
      <div className={classes.userDetails}>
        <div className={classes.descriptionField}>
          <div className={classes.usernameField}>
            {props.currentUser.username}
            {props.currentUser.age ? `, ${props.currentUser.age}` : ""}
          </div>
          <div className={classes.distanceField}>{"0 km away"}</div>
          {props.currentUser.bio.length > 0 && (
            <div style={{ fontSize: "20px" }}>{props.currentUser.bio}</div>
          )}
          {props.currentUser.bio.length === 0 && (
            <div style={{ fontSize: "20px", color: "#979797" }}>
              {props.currentUser.username} does not have a bio...
            </div>
          )}
        </div>
        <div className={classes.scoreField}>
          Score <b>{props.currentUser.score}</b>
        </div>
        <div className={classes.descriptionField}>
          <div
            className={classes.usernameField}
            style={{ marginBottom: "20px" }}
          >
            Interests
          </div>
          {!props.currentUser.interests && (
            <div style={{ fontSize: "20px", color: "#979797" }}>
              {props.currentUser.username} does not have interests...
            </div>
          )}
          {props.currentUser.interests && (
            <div className={classes.intField}>
              {props.currentUser.interests.map(
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
    </>
  );
};

export default OwnInfo;
