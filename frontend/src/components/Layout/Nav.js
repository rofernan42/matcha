import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Nav.module.css";
import { socket } from "../../util/utils";
import { fetchMatches } from "../../util/chatsReq";
import logo from "../../images/logo.png";
import notifsIcon from "../../images/notification.png";
import chat from "../../images/bubble.png";
import search from "../../images/search.png";
import { url } from "../../util/utils";
import UserOptions from "./UserOptions";
import blankPicture from "../../images/blank-profile-picture.jpg";
import { ToastContainer } from "react-toastify";
import Notifs from "./Notifs";
import { deleteNotifications, fetchNotifs } from "../../util/notifsReq";
import { useSelector } from "react-redux";

const Nav = (props) => {
  const authCtx = useContext(AuthContext);
  const [chatNotif, setChatNotif] = useState("");
  const [pushNotif, setPushNotif] = useState("");
  const [notifs, setNotifs] = useState(null);
  const loc = useLocation();
  const isAuth = authCtx.isAuth;
  const currentUser = useSelector((state) => state.currentUser.data);

  const logoutHandler = () => {
    authCtx.logout();
  };

  socket.off("getChatNotif").on("getChatNotif", () => {
    if (loc.pathname !== "/chat") {
      setChatNotif(classes.pushNotif);
    }
  });
  socket.off("getPushNotif").on("getPushNotif", async () => {
    !props.dropdowns.notifs && setPushNotif(classes.pushNotif);
    try {
      const notifsData = await fetchNotifs({
        token: authCtx.token,
        path: "notifications",
      });
      setNotifs(notifsData);
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    const getMatchesNotifs = async () => {
      try {
        const data = await fetchMatches({
          token: authCtx.token,
          path: "chat/matches",
        });
        const notifsData = await fetchNotifs({
          token: authCtx.token,
          path: "notifications",
        });
        setNotifs(notifsData);
        const newMsgs = data.matches.find(
          (match) =>
            match.match.lastMessage &&
            !match.match.msgRead &&
            match.match.msgAuthor !== +authCtx.userId
        );
        if (newMsgs && loc.pathname !== "/chat")
          setChatNotif(classes.pushNotif);
        else setChatNotif("");
      } catch (err) {
        console.log(err);
      }
    };
    if (isAuth) getMatchesNotifs();
  }, [authCtx, isAuth, loc.pathname]);

  const deleteNotif = async (data) => {
    try {
      const notifsData = await deleteNotifications({
        ...data,
        token: authCtx.token,
      });
      setNotifs(notifsData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="colored"
      />
      <header className={classes.header}>
        <div className={classes.logo}>
          <NavLink activeClassName={classes.active} to="/" exact>
            <img className={classes.logoIcon} alt="" src={logo} />
            <div className={classes.appName}>Matcha</div>
          </NavLink>
        </div>
        <nav>
          <ul>
            {!isAuth && (
              <li>
                <NavLink activeClassName={classes.active} to="/login">
                  Login
                </NavLink>
              </li>
            )}
            {!isAuth && (
              <li>
                <NavLink activeClassName={classes.active} to="/signup">
                  <button>Sign up</button>
                </NavLink>
              </li>
            )}
            {isAuth && (
              <li>
                <NavLink activeClassName={classes.active} to="/users">
                  <img className={classes.navIcon} alt="" src={search} />
                </NavLink>
              </li>
            )}
            {isAuth && (
              <li>
                <NavLink activeClassName={classes.active} to="/chat">
                  <img className={classes.navIcon} alt="" src={chat} />
                </NavLink>
                <span className={chatNotif}></span>
              </li>
            )}
            {isAuth && (
              <li>
                <img
                  className={classes.navIcon}
                  alt=""
                  src={notifsIcon}
                  onClick={() => {
                    props.onToggle.notifsToggleOptions();
                    setPushNotif("");
                  }}
                />
                <span className={pushNotif}></span>
              </li>
            )}
            {isAuth && currentUser && (
              <li onClick={() => props.onToggle.userToggleOptions()}>
                <div className={classes.userField}>
                  {currentUser.username}{" "}
                  {currentUser.images[0] && (
                    <img
                      alt=""
                      src={url + currentUser.images[0]}
                      className={classes.avatar}
                    />
                  )}
                  {!currentUser.images[0] && (
                    <img alt="" src={blankPicture} className={classes.avatar} />
                  )}
                </div>
              </li>
            )}
          </ul>
          {props.dropdowns.notifs && (
            <Notifs notifs={notifs} onDeleteNotif={deleteNotif} />
          )}
          {props.dropdowns.userOptions && (
            <UserOptions onLogout={logoutHandler} />
          )}
        </nav>
      </header>
    </>
  );
};

export default Nav;
