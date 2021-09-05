import { useContext, useEffect, useRef, useState } from "react";
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

const cancelModalData = {
  title: "Cancel match?",
  content: `You won't be able to communicate with this user anymore.
  All the messages you exchanged will be deleted.`,
};
const blockModalData = {
  title: "Are you sure?",
  content: `You won't be able to communicate with this user and see his profile anymore.
You can unblock this user from your profile page.`,
};

const Chat = (props) => {
  const authCtx = useContext(AuthContext);
  const [messages, setMessages] = useState(props.room.roomData.messages);
  const scrollRef = useRef();
  const [newMsg, setNewMsg] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [blockModalActive, setBlockModalActive] = useState(false);
  const [cancelModalActive, setCancelModalActive] = useState(false);
  const history = useHistory();
  // const [profileActive, setProfileActive] = useState(false);
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
    }
  }, [currentRoom._id, props]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (newMsg.length > 0) {
      socket.emit("sendMessage", {
        senderId: authCtx.userId,
        receiverId: props.room.user._id,
        text: newMsg,
        roomId: currentRoom._id,
      });
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
    setCancelModalActive(false);
    setBlockModalActive(false);
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
  // const closeProfileHandler = () => {
  //   setProfileActive(false);
  // };

  const imgProfile = props.room.user.images.find((img) => img !== null);
  return (
    <div className={classes.room}>
      <div className={classes.wrapper}>
        <ChatHeader
          user={props.room.user}
          imgProfile={imgProfile}
          onBlockModal={() => setBlockModalActive(true)}
          onCancelModal={() => setCancelModalActive(true)}
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

      {/* {profileActive && <ProfileCard key={props.room.user._id}
          onCloseProfile={closeProfileHandler}
          user={props.room.user}
          token={authCtx.token}
          // actualisePage={actualisePage}
          // liked={currentUser.likes.includes(userProfile.profile._id)}
          // online={props.onlineUsers.some(
          //   (e) => e.userId === userProfile.profile._id.toString()
          // )}
          />} */}
      {blockModalActive && (
        <Modal
          onConfirm={blockUserHandler}
          onCloseModal={closeModal}
          data={blockModalData}
        />
      )}
      {cancelModalActive && (
        <Modal
          onConfirm={cancelMatchHandler}
          onCloseModal={closeModal}
          data={cancelModalData}
        />
      )}
    </div>
  );
};

export default Chat;
