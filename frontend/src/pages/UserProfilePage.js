import { useContext, useEffect, useReducer, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import { fetchUser } from "../util/usersReq";
import classes from "../components/UserProfile/UserProfile.module.css";
import Modal from "../components/ui/Modal";
import { toast } from "react-toastify";
import { socket } from "../util/utils";
import { createNotification } from "../util/notifsReq";
import ImageSlider from "../components/Users/ImageSlider";
import SideInfo from "../components/UserProfile/SideInfo";
import MainInfo from "../components/UserProfile/MainInfo";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../store/currentUser-actions";

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

const UserProfilePage = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.data);
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [modal, dispatchModal] = useReducer(setModalActive, {
    blockModal: false,
    cancelModal: false,
    reportModal: false,
    modalData: null,
  });
  const { sendReq, status, data: user, error } = useHttp(fetchUser, true);
  const [imgSlider, setImgSlider] = useState(false);

  const notification = async (type, socketName) => {
    try {
      if (+params.userId !== currentUser._id) {
        await createNotification({
          token: authCtx.token,
          type: type,
          userId: params.userId,
        });
        socket.emit(socketName, {
          userId: params.userId,
          username: currentUser?.username,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendReq({
      path: `users/${params.userId}`,
      token: authCtx.token,
    });
  }, [authCtx.token, params.userId, sendReq]);

  const blockUserHandler = async () => {
    try {
      await dispatch(
        userAction({
          path: `block/${params.userId}`,
          method: "POST",
          token: authCtx.token,
        })
      );
      toast.warning(`You have blocked ${user.username}`);
      history.push("/users");
    } catch (err) {
      console.log(err);
    }
  };
  const cancelMatchHandler = async () => {
    try {
      await dispatch(
        userAction({
          path: `cancel-match/${params.userId}`,
          method: "DELETE",
          token: authCtx.token,
        })
      );
      toast.warning(`You have cancelled the match with ${user.username}.`);
      dispatchModal({ type: "CLOSE" });
      notification("cancel", "cancelMatch");
    } catch (err) {
      console.log(err);
    }
  };
  const reportUserHandler = async () => {
    await dispatch(
      userAction({
        path: `report/${params.userId}`,
        method: "POST",
        token: authCtx.token,
      })
    );
    toast.warning(`You have reported ${user.username}.`);
    dispatchModal({ type: "CLOSE" });
  };

  const closeModal = () => {
    dispatchModal({ type: "CLOSE" });
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
          <SideInfo
            user={user}
            onReport={() => dispatchModal({ type: "REPORT" })}
            onBlock={() => dispatchModal({ type: "BLOCK" })}
            onSetImgSlider={() => setImgSlider(true)}
            onlineUsers={props.onlineUsers}
            params={params}
          />
          <MainInfo
            user={user}
            currentUser={currentUser}
            token={authCtx.token}
            notification={notification}
            onCancel={() => dispatchModal({ type: "CANCEL" })}
            params={params}
          />
          {imgSlider && (
            <div>
              <div
                className={classes.background}
                onClick={() => setImgSlider(false)}
              />
              <div className={classes.imageSlider}>
                <ImageSlider
                  images={user.images}
                  width={"600px"}
                  height={"400px"}
                  btnSize={"80px"}
                  overflowX={"visible"}
                />
              </div>
            </div>
          )}
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

export default UserProfilePage;
