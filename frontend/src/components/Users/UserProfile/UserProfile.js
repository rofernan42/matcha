import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import AuthContext from "../../../store/auth-context";
import {
  fetchCurrentUser,
  fetchUser,
  url,
  userAction,
} from "../../../util/usersReq";
import classes from "./UserProfile.module.css";
import profil from "../../../images/blank-profile-picture.jpg";
import heart from "../../../images/heart.png";
import heartFull from "../../../images/heart-full.png";
import heartColor from "../../../images/heart-color.png";
import block from "../../../images/block.png";
import report from "../../../images/report.png";
import Modal from "../../ui/Modal";
import LikeButton from "../LikeButton";
import Footer from "./Footer";
import { toast } from "react-toastify";
import socket from "../../../util/socket";
import { createNotification } from "../../../util/notifsReq";

const setModalActive = (state, action) => {
  if (action.type === "BLOCK") {
    return {
      blockModal: true,
      cancelModal: false,
      reportModal: false,
      modalData: {
        title: "Block this user?",
        content: `You won't be able to communicate with this user and see his profile anymore.
        You can unblock this user from your profile page.`,
      },
    };
  }
  if (action.type === "CANCEL") {
    return {
      blockModal: false,
      cancelModal: true,
      reportModal: false,
      modalData: {
        title: "Cancel match?",
        content: `You won't be able to communicate with this user anymore.
        All the messages you exchanged will be deleted.`,
      },
    };
  }
  if (action.type === "REPORT") {
    return {
      blockModal: false,
      cancelModal: false,
      reportModal: true,
      modalData: {
        title: "Does this profile seem suspect to you?",
        content: `An email will be sent to the admin and this profile will be reviewed before further action.
        You can block this user or cancel the match.`,
      },
    };
  }
  if (action.type === "CLOSE") {
    return {
      blockModal: false,
      cancelModal: false,
      reportModal: false,
      modalData: null,
    };
  }
  return state;
};

const UserProfile = (props) => {
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [modal, dispatch] = useReducer(setModalActive, {
    blockModal: false,
    cancelModal: false,
    reportModal: false,
    modalData: null,
  });
  const [liked, setLiked] = useState(null);
  const [matched, setMatched] = useState(null);
  const { sendReq, status, data: user, error } = useHttp(fetchUser, true);
  const [currentUser, setCurrentUser] = useState(null);

  const visitNotification = useCallback(async () => {
    try {
      const userData = await fetchCurrentUser(authCtx.token);
      await userAction({
        path: `visit/${params.userId}`,
        method: "POST",
        token: authCtx.token,
      });
      await createNotification({
        token: authCtx.token,
        type: "visit",
        userId: params.userId,
      });
      socket.emit("newVisit", {
        userId: params.userId,
      });
      setCurrentUser(userData);
    } catch (err) {
      console.log(err);
    }
  }, [authCtx.token, params.userId]);

  useEffect(() => {
    sendReq({
      path: `users/${params.userId}`,
      token: authCtx.token,
    });
    visitNotification();
  }, [authCtx.token, params.userId, sendReq, visitNotification]);

  const blockUserHandler = async () => {
    try {
      await userAction({
        path: `block/${params.userId}`,
        method: "POST",
        token: authCtx.token,
      });
      toast.warning(`You have blocked ${user.username}`);
      history.push("/users");
    } catch (err) {
      console.log(err);
    }
  };
  const cancelMatchHandler = async () => {
    try {
      await userAction({
        path: `cancel-match/${params.userId}`,
        method: "DELETE",
        token: authCtx.token,
      });
      toast.warning(`You have cancelled the match with ${user.username}.`);
      setMatched(false);
      setLiked(false);
      dispatch({ type: "CLOSE" });
      await createNotification({
        token: authCtx.token,
        type: "cancel",
        userId: params.userId,
      });
      socket.emit("cancelMatch", {
        userId: params.userId,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const reportUserHandler = async () => {
    await userAction({
      path: `report/${params.userId}`,
      method: "POST",
      token: authCtx.token,
    });
    toast.warning(`You have reported ${user.username}.`);
    dispatch({ type: "CLOSE" });
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE" });
  };

  const sendLikeHandler = async () => {
    try {
      const resData = await userAction({
        path: `send-like/${params.userId}`,
        method: "POST",
        token: authCtx.token,
      });
      setLiked(resData.likes.includes(+params.userId));
      if (resData.match) {
        setMatched(true);
        toast(`You matched with ${user.username}!`, {
          style: { backgroundColor: "#9f5ccc", color: "white" },
        });
        await createNotification({
          token: authCtx.token,
          type: "match",
          userId: params.userId,
        });
        socket.emit("newMatch", {
          userId: params.userId,
          username: currentUser?.user.username,
        });
      } else if (resData.likes.includes(+params.userId)) {
        await createNotification({
          token: authCtx.token,
          type: "like",
          userId: params.userId,
        });
        socket.emit("newLike", {
          userId: params.userId,
        });
      }
    } catch (err) {
      console.log(err);
    }
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
                  onClick={() => dispatch({ type: "BLOCK" })}
                  style={{ cursor: "pointer" }}
                />
                <img
                  className={classes.icon}
                  alt=""
                  src={report}
                  onClick={() => dispatch({ type: "REPORT" })}
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
                {user.username} does not have a bio...
              </div>
            )}
            <div className={classes.label}>Interests</div>
            {!user.interests && (
              <div className={classes.bioField}>
                {user.username} does not have interests...
              </div>
            )}
            {user.interests && (
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
            )}
            <div className={classes.additional}>
              <div>
                <div className={classes.label}>Score</div>
                <div className={classes.score}>
                  <span className={classes.num}>{user.score}</span>
                  <span className={classes.denum}>5</span>
                </div>
              </div>
              {((!user.matchedMe && matched === null) || matched === false) && (
                <div className={classes.likeButton}>
                  <LikeButton
                    sendLikeHandler={sendLikeHandler}
                    liked={
                      liked === null
                        ? currentUser.likes.includes(+params.userId)
                        : liked
                    }
                  />
                </div>
              )}
              {(matched === null ? user.matchedMe : matched) && (
                <div className={classes.matchField}>
                  <div>
                    That's a match!{" "}
                    <img
                      alt=""
                      src={heartColor}
                      className={classes.matchHeart}
                    />
                  </div>
                  <div
                    className={classes.cancelMatch}
                    onClick={() => dispatch({ type: "CANCEL" })}
                  >
                    &times; Cancel match
                  </div>
                </div>
              )}
            </div>
            <Footer
              currentUser={currentUser.user}
              user={user}
              params={params}
              onlineUsers={props.onlineUsers}
            />
          </div>
          {(modal.blockModal || modal.cancelModal || modal.reportModal) && (
            <Modal
              onConfirm={
                modal.blockModal
                  ? blockUserHandler
                  : modal.cancelModal
                  ? cancelMatchHandler
                  : reportUserHandler
              }
              onCloseModal={closeModal}
              data={modal.modalData}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
