import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import {
  fetchCurrentUser,
  fetchUser,
  url,
  userAction,
} from "../../util/usersReq";
import classes from "./UserProfile.module.css";
import profil from "../../images/blank-profile-picture.jpg";
import heart from "../../images/heart.png";
import heartFull from "../../images/heart-full.png";
import block from "../../images/block.png";
import Modal from "../ui/Modal";
import TimeAgo from "react-timeago";
import { calculateDistance } from "../../util/geolocation";

const blockModalData = {
  title: "Are you sure?",
  content: `You won't be able to communicate with this user and see his profile anymore.
  You can unblock this user from your profile page.`,
};

const UserProfile = (props) => {
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [blockModalActive, setBlockModalActive] = useState(false);
  const [online, setOnline] = useState(false);
  const { sendReq, status, data: user, error } = useHttp(fetchUser, true);
  const { sendReq: sendReqCurrentUser, data: currentUser } = useHttp(
    fetchCurrentUser,
    true
  );
  useEffect(() => {
    sendReq({
      path: `users/${params.userId}`,
      token: authCtx.token,
    });
    sendReqCurrentUser(authCtx.token);
    setOnline(
      props.onlineUsers.some((e) => e.userId === params.userId.toString())
    );
  }, [
    authCtx.token,
    sendReq,
    sendReqCurrentUser,
    params.userId,
    props.onlineUsers,
  ]);

  const blockUserHandler = async () => {
    if (user) {
      await userAction({
        path: `block/${params.userId}`,
        method: "POST",
        token: authCtx.token,
      });
      history.push("/users");
    }
  };
  const closeModal = () => {
    // setCancelModalActive(false);
    setBlockModalActive(false);
  };
  return (
    <>
      {(error || (status === "completed" && !user)) && (
        <div className={classes.userNotFound}>
          <div>User not found</div>
          <Link to="/">Back to main page</Link>
        </div>
      )}
      {user && currentUser && (
        <div className={classes.userProfile}>
          <div className={classes.userInfo}>
            <div className={classes.infoField}>
              {user.images.length === 0 && (
                <img className={classes.avatar} alt="" src={profil} />
              )}
              {user.images.length > 0 && (
                <img
                  className={classes.avatar}
                  alt=""
                  src={url + user.images[0]}
                />
              )}
              <div>
                <div className={classes.label}>Username</div>
                <div>{user.username}</div>
              </div>
              <div>
                <div className={classes.label}>Full name</div>
                <div>
                  {user.name} {user.lastname}
                </div>
              </div>
              {user.age && (
                <div>
                  <div className={classes.label}>Age</div>
                  <div>{user.age}</div>
                </div>
              )}
              <div className={classes.icons}>
                {!user.likesMe && (
                  <img className={classes.icon} alt="" src={heart} />
                )}
                {user.likesMe && (
                  <img className={classes.icon} alt="" src={heartFull} />
                )}
                <img
                  className={classes.icon}
                  alt=""
                  src={block}
                  onClick={() => setBlockModalActive(true)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
          <div className={classes.userDetails}>
            <div className={classes.label}>Bio</div>
            {user.bio.length > 0 && (
              <div className={classes.bioField}>{user.bio}</div>
            )}
            {user.bio.length === 0 && (
              <div className={classes.bioField}>
                {user.username} does not have a bio.
              </div>
            )}
            <div className={classes.label}>Interests</div>
            <div className={classes.intField}>
              {user.interests.map(
                (int) =>
                  int.length > 0 && (
                    <div className={classes.interestOption} key={int}>
                      #{int}
                    </div>
                  )
              )}
            </div>
            <div className={classes.footer}>
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
                    <TimeAgo date={user.lastConnection} />
                  </span>
                )}
              </div>
              <div>
                {calculateDistance(
                  currentUser.user.lat,
                  user.lat,
                  currentUser.user.lon,
                  user.lon
                )}
                km away
              </div>
            </div>
          </div>
          {blockModalActive && (
            <Modal
              onConfirm={blockUserHandler}
              onCloseModal={closeModal}
              data={blockModalData}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
