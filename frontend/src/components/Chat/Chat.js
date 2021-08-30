import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import Message from "./Message";
import classes from "./Chat.module.css";
import { url } from "../../util/usersReq";
import socket from "../../util/socket";

const Chat = (props) => {
  const authCtx = useContext(AuthContext);
  const [messages, setMessages] = useState(props.room.roomData.messages);
  const scrollRef = useRef();
  const [newMsg, setNewMsg] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const currentRoom = props.room.roomData;

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
    });
  }, []);

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
          url + `chat/room/${props.room.roomData._id}/message`,
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

  const imgProfile = props.room.user.images.find((img) => img !== null);
  return (
    <div className={classes.room}>
      <div className={classes.wrapper}>
        <div className={classes.roomHeader}>
          {messages &&
            messages.map((msg) => {
              return (
              <div key={msg._id} ref={scrollRef}>
                <Message
                  imgProfile={`${url}${imgProfile}`}
                  key={msg._id}
                  msg={msg}
                  who={msg.creator === authCtx.userId ? "me" : "you"}
                />
              </div>
            )})}
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
    </div>
  );
};

export default Chat;
