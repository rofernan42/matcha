import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import Message from "./Message";
import classes from "./Room.module.css";

const sendMessage = async (token, reqData) => {
  const res = await fetch("http://localhost:8000/post-message", {
    method: "POST",
    body: JSON.stringify(reqData),
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Could not send message");
  }
  return { posted: data.posted };
};

const Chat = (props) => {
  const textRef = useRef();
  const authCtx = useContext(AuthContext);
  const { sendReq, status } = useHttp(sendMessage, true);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const entText = textRef.current.value;
    sendReq(authCtx.token, entText);
  };
  return (
    <main className={classes.room}>
      <header>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
          alt=""
        />
        <div>
          <h2>Chat with Vincent Porter</h2>
        </div>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png"
          alt=""
        />
      </header>
      <ul id={classes.chat}>
        <Message />
        <li className={classes.me}>
          <div className={classes.entete}>
            <h3>10:12AM, Today</h3>
            <h2>Vincent</h2>
            <span className={`${classes.status} ${classes.blue}`}></span>
          </div>
          <div className={classes.triangle}></div>
          <div className={classes.message}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </div>
        </li>
        <li className={classes.me}>
          <div className={classes.entete}>
            <h3>10:12AM, Today</h3>
            <h2>Vincent</h2>
            <span className={`${classes.status} ${classes.blue}`}></span>
          </div>
          <div className={classes.triangle}></div>
          <div className={classes.message}>OK</div>
        </li>
        <li className={classes.you}>
          <div className={classes.entete}>
            <span className={`${classes.status} ${classes.green}`}></span>
            <h2>Vincent</h2>
            <h3>10:12AM, Today</h3>
          </div>
          <div className={classes.triangle}></div>
          <div className={classes.message}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </div>
        </li>
        <li className={classes.me}>
          <div className={classes.entete}>
            <h3>10:12AM, Today</h3>
            <h2>Vincent</h2>
            <span className={`${classes.status} ${classes.blue}`}></span>
          </div>
          <div className={classes.triangle}></div>
          <div className={classes.message}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </div>
        </li>
        <li className={classes.me}>
          <div className={classes.entete}>
            <h3>10:12AM, Today</h3>
            <h2>Vincent</h2>
            <span className={`${classes.status} ${classes.blue}`}></span>
          </div>
          <div className={classes.triangle}></div>
          <div className={classes.message}>OK</div>
        </li>
      </ul>
      <footer>
        <form onSubmit={formSubmitHandler}>
          <input
            type="textarea"
            ref={textRef}
            placeholder="Type your message"
          />
          <button>Send</button>
        </form>
      </footer>
    </main>
  );
};

export default Chat;
