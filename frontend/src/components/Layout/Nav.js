import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Nav.module.css";
import socket from "../../util/socket";
import { fetchMatches } from "../../util/chatsReq";

const Nav = () => {
  const authCtx = useContext(AuthContext);
  const [pushNotif, setPushNotif] = useState("");
  const loc = useLocation();
  const isAuth = authCtx.isAuth;
  const logoutHandler = () => {
    authCtx.logout();
  };
  socket.off("getPushNotif").on("getPushNotif", () => {
    if (loc.pathname !== "/chat") {
      setPushNotif(classes.pushNotif);
    }
  });
  useEffect(() => {
    const getMatches = async () => {
      const data = await fetchMatches({
        token: authCtx.token,
        path: "chat/matches",
      });
      const newMsgs = data.matches.find(
        (match) =>
          !match.match.msgRead && match.match.msgAuthor !== +authCtx.userId
      );
      if (newMsgs && loc.pathname !== "/chat") setPushNotif(classes.pushNotif);
      else setPushNotif("");
    };
    if (isAuth) getMatches();
  }, [authCtx, isAuth, loc.pathname]);

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
              <NavLink activeClassName={classes.active} to="/profile">
                Profile
              </NavLink>
            </li>
          )}
          {isAuth && (
            <li>
              <button type="button" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
