import { useContext, useEffect } from "react";
import Settings from "../components/Profile/Settings";
import Sidenav from "../components/Profile/Sidenav";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import classes from "./Pages.module.css";
import { fetchCurrentUser, updateUser } from "../util/usersReq";
import Options from "../components/Profile/Options";
import Likes from "../components/Profile/Likes";
import Blocked from "../components/Profile/Blocked";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const loc = useLocation();
  const { sendReq, status, data: user } = useHttp(fetchCurrentUser, true);
  const {
    sendReq: sendUpdate,
    data: updatedUser,
    error: errorUpdate,
  } = useHttp(updateUser, true);

  const updateUserHandler = (attr) => {
    sendUpdate({
      token: authCtx.token,
      ...attr,
    });
  };

  useEffect(() => {
    sendReq(authCtx.token);
  }, [sendReq, authCtx.token]);

  return (
    <>
      <div className={classes.profilePage}></div>
      {user && (
        <>
          <Sidenav />
          {loc.hash === "" && (
            <Settings
              user={updatedUser ? updatedUser : user.user}
              images={user.user.images}
              status={status}
              onChangeUser={updateUserHandler}
              token={authCtx.token}
              error={errorUpdate ? errorUpdate : {}}
            />
          )}
          {loc.hash === "#options" && (
            <Options
              user={updatedUser ? updatedUser : user.user}
              status={status}
              onChangeUser={updateUserHandler}
              token={authCtx.token}
              error={errorUpdate ? errorUpdate : {}}
            />
          )}
          {loc.hash === "#likes" && <Likes token={authCtx.token} />}
          {loc.hash === "#blocks" && <Blocked token={authCtx.token} />}
        </>
      )}
    </>
  );
};

export default ProfilePage;
