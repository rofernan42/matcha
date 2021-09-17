import { useContext, useEffect, useReducer, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import Message from "./Message";
import classes from "./Chat.module.css";
import { url, userAction } from "../../util/usersReq";
import socket from "../../util/socket";
import ChatHeader from "./ChatHeader";
import { useHistory } from "react-router-dom";
import Modal from "../ui/Modal";
// import cross from "../../images/cancel.png";
// import { Link } from "react-router-dom";

const setModalActive = (state, action) => {
  if (action.type === "BLOCK") {
    return {
      blockModal: true,
      cancelModal: false,
      modalData: {
        title: "Are you sure?",
        content: `You won't be able to communicate with this user and see his profile anymore.
        You can unblock this user from your profile page.`,
      },
    };
  }
  if (action.type === "CANCEL") {
    return {
      blockModal: false,
      cancelModal: true,
      modalData: {
        title: "Cancel match?",
        content: `You won't be able to communicate with this user anymore.
        All the messages you exchanged will be deleted.`,
      },
    };
  }
  if (action.type === "CLOSE") {
    return {
      blockModal: false,
      cancelModal: false,
      modalData: null,
    };
  }
  return state;
};

const Chat = (props) => {
  const authCtx = useContext(AuthContext);
  const [messages, setMessages] = useState(props.room.roomData.messages);
  const scrollRef = useRef();
  const [newMsg, setNewMsg] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [modal, dispatch] = useReducer(setModalActive, {
    blockModal: false,
    cancelModal: false,
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
    await userAction({
      path: `block/${props.room.user._id}`,
      method: "POST",
      token: authCtx.token,
    });
    // socket.emit("blockUser", { userId: props.user._id });
    history.go(0);
  };
  const cancelMatchHandler = async () => {
    await userAction({
      path: `cancel-match/${props.room.user._id}`,
      method: "DELETE",
      token: authCtx.token,
    });
    history.go(0);
  };

  const imgProfile = props.room.user.images.find((img) => img !== null);
  return (
    <div className={classes.room}>
      <div className={classes.wrapper}>
        <ChatHeader
          user={props.room.user}
          imgProfile={imgProfile}
          onBlockModal={() => dispatch({ type: "BLOCK" })}
          onCancelModal={() => dispatch({ type: "CANCEL" })}
        />
        <div className={classes.roomHeader}>
          {messages &&
            messages.map((msg) => {
              return (
                <div key={msg._id} ref={scrollRef}>
                  <Message
                    imgProfile={`${url}${imgProfile}`}
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

      {(modal.blockModal || modal.cancelModal) && (
        <Modal
          onConfirm={modal.blockModal ? blockUserHandler : cancelMatchHandler}
          onCloseModal={closeModal}
          data={modal.modalData}
        />
      )}
    </div>
  );
};

export default Chat;
