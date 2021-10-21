import { useContext, useEffect, useReducer, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import Message from "./Message";
import classes from "./Chat.module.css";
import { url, socket } from "../../util/utils";
import { userAction } from "../../store/currentUser-actions";
import ChatHeader from "./ChatHeader";
import { useHistory } from "react-router-dom";
import Modal from "../ui/Modal";
import { toast } from "react-toastify";
import { createNotification } from "../../util/notifsReq";
import { useDispatch } from "react-redux";
import { currentUserActions } from "../../store/currentUser-slice";

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

const Chat = (props) => {
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const [messages, setMessages] = useState(props.room.roomData.messages);
  const scrollRef = useRef();
  const [newMsg, setNewMsg] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [modal, dispatchModal] = useReducer(setModalActive, {
    blockModal: false,
    cancelModal: false,
    reportModal: false,
    modalData: null,
  });
  const history = useHistory();
  const currentRoom = props.room.roomData.match;

  useEffect(() => {
    arrivalMessage &&
      arrivalMessage.fromRoom === currentRoom._id &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentRoom._id]);

  useEffect(() => {
    socket.off("getMessage").on("getMessage", (data) => {
      setArrivalMessage({
        creator: data.senderId,
        content: data.text,
        created_at: Date.now(),
        _id: Math.random(),
        fromRoom: data.fromRoom,
      });
      props.onUpdateConvos(currentRoom._id);
    });
    return () => {
      socket.off("getMessage");
    };
  }, [currentRoom._id, props]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (newMsg.length > 0) {
      try {
        const res = await fetch(
          url + `chat/room/${props.room.roomData.match._id}/message`,
          {
            method: "POST",
            body: JSON.stringify({ content: newMsg }),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authCtx.token,
            },
          }
        );
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.message || "Could not send message");
        }
        await props.onUpdateConvos(currentRoom._id);
        socket.emit("sendMessage", {
          senderId: authCtx.userId,
          receiverId: props.room.user._id,
          text: newMsg,
          roomId: currentRoom._id,
        });
        setMessages(resData.messages);
        setNewMsg("");
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      formSubmitHandler(e);
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE" });
  };

  const blockUserHandler = async () => {
    await dispatch(
      userAction({
        path: `block/${props.room.user._id}`,
        method: "POST",
        token: authCtx.token,
      })
    );
    dispatch(currentUserActions.destroyLike(props.room.user._id));
    history.go(0);
  };
  const cancelMatchHandler = async () => {
    await dispatch(
      userAction({
        path: `cancel-match/${props.room.user._id}`,
        method: "DELETE",
        token: authCtx.token,
      })
    );
    await createNotification({
      token: authCtx.token,
      type: "cancel",
      userId: props.room.user._id,
    });
    socket.emit("cancelMatch", {
      userId: props.room.user._id,
    });
    dispatch(currentUserActions.destroyLike(props.room.user._id));
    history.go(0);
  };
  const reportUserHandler = async () => {
    await dispatch(
      userAction({
        path: `report/${props.room.user._id}`,
        method: "POST",
        token: authCtx.token,
      })
    );
    toast.warning(`You have reported ${props.room.user.username}.`);
    dispatchModal({ type: "CLOSE" });
  };

  return (
    <div className={classes.room}>
      <div className={classes.wrapper}>
        <ChatHeader
          user={props.room.user}
          imgProfile={props.room.user.image}
          onBlockModal={() => dispatchModal({ type: "BLOCK" })}
          onCancelModal={() => dispatchModal({ type: "CANCEL" })}
          onReportModal={() => dispatchModal({ type: "REPORT" })}
        />
        <div className={classes.roomHeader}>
          {messages &&
            messages.map((msg) => {
              return (
                <div key={msg._id} ref={scrollRef}>
                  <Message
                    imgProfile={props.room.user.image}
                    key={msg._id}
                    msg={msg}
                    who={msg.user_id === +authCtx.userId ? "me" : "you"}
                  />
                </div>
              );
            })}
        </div>
        <form className={classes.roomFooter} onSubmit={formSubmitHandler}>
          <textarea
            className={classes.messageInput}
            placeholder="Type your message..."
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyPress={keyPressHandler}
          />
          <button className={classes.send}>Send</button>
        </form>
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
  );
};

export default Chat;
