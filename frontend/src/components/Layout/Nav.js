import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Nav.module.css";
import socket from "../../util/socket";
import { fetchMatches } from "../../util/chatsReq";
import notifs from "../../images/notification.png";
import { fetchCurrentUser, url } from "../../util/usersReq";
import UserOptions from "./UserOptions";

const Nav = (props) => {
  const authCtx = useContext(AuthContext);
  const [pushNotif, setPushNotif] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const loc = useLocation();
  const isAuth = authCtx.isAuth;

  const logoutHandler = () => {
    authCtx.logout();
    props.onSetUserOptions();
  };
  socket.off("getPushNotif").on("getPushNotif", () => {
    if (loc.pathname !== "/chat") {
      setPushNotif(classes.pushNotif);
    }
  });
  useEffect(() => {
    const getMatches = async () => {
      try {
        const data = await fetchMatches({
          token: authCtx.token,
          path: "chat/matches",
        });
        const newMsgs = data.matches.find(
          (match) =>
            !match.match.msgRead && match.match.msgAuthor !== +authCtx.userId
        );
        if (newMsgs && loc.pathname !== "/chat")
          setPushNotif(classes.pushNotif);
        else setPushNotif("");
      } catch (err) {
        console.log(err);
        authCtx.logout();
      }
    };
    if (isAuth) getMatches();
  }, [authCtx, isAuth, loc.pathname]);

  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await fetchCurrentUser(authCtx.token);
      setCurrentUser(data.user);
    };
    if (isAuth) getCurrentUser();
  }, [isAuth, authCtx.token]);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink activeClassName={classes.active} to="/" exact>
          Matcha
        </NavLink>
      </div>
      <nav>
        <ul>
          {isAuth && (
            <li>
              <NavLink activeClassName={classes.active} to="/chat">
                Matches
              </NavLink>
              <span className={pushNotif}></span>
            </li>
          )}
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
              <img className={classes.navIcon} alt="" src={notifs} />
            </li>
          )}
          {isAuth && currentUser && (
            <li onClick={() => props.onSetUserOptions()}>
              <div>
                {currentUser.username}{" "}
                <img alt="" src={url + currentUser.images[0]} className={classes.avatar} />
              </div>
            </li>
          )}
        </ul>
        {props.currentUserOptions && <UserOptions onLogout={logoutHandler} />}
      </nav>
    </header>
  );
};

export default Nav;
