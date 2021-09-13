import { useContext, useEffect, useReducer } from "react";
import Settings from "../components/Profile/Settings";
import Sidenav from "../components/Profile/Sidenav";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import classes from "./Pages.module.css";
import { fetchCurrentUser, updateUser } from "../util/usersReq";
import Options from "../components/Profile/Options";
import Likes from "../components/Profile/Likes";
import Blocked from "../components/Profile/Blocked";

const setPageActive = (state, action) => {
  if (action.type === "SETTINGS") {
    return {
      settings: true,
      options: false,
      likes: false,
      blocked: false,
    };
  }
  if (action.type === "OPTIONS") {
    return {
      settings: false,
      options: true,
      likes: false,
      blocked: false,
    };
  }
  if (action.type === "LIKES") {
    return {
      settings: false,
      options: false,
      likes: true,
      blocked: false,
    };
  }
  if (action.type === "BLOCKED") {
    return {
      settings: false,
      options: false,
      likes: false,
      blocked: true,
    };
  }
  return state;
};

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const [pageActive, dispatch] = useReducer(setPageActive, {
    settings: true,
    options: false,
    likes: false,
    blocked: false,
  });
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

  const changePage = (page) => {
    dispatch({ type: page });
  };
  return (
    <>
      <div className={classes.profilePage}>
        {user && (
          <>
            <Sidenav onChangePage={changePage} page={pageActive} />
            {pageActive.settings && (
              <Settings
                user={updatedUser ? updatedUser : user.user}
                images={user.user.images}
                status={status}
                onChangeUser={updateUserHandler}
                token={authCtx.token}
                error={errorUpdate ? errorUpdate : {}}
              />
            )}
            {pageActive.options && (
              <Options
                user={updatedUser ? updatedUser : user.user}
                status={status}
                onChangeUser={updateUserHandler}
                token={authCtx.token}
                error={errorUpdate ? errorUpdate : {}}
              />
            )}
            {pageActive.likes && (
              <Likes
                // user={updatedUser ? updatedUser : user.user}
                // status={status}
                // onChangeUser={updateUserHandler}
                token={authCtx.token}
                // error={errorUpdate ? errorUpdate : {}}
              />
            )}
            {pageActive.blocked && (
              <Blocked
                // user={updatedUser ? updatedUser : user.user}
                // status={status}
                // onChangeUser={updateUserHandler}
                token={authCtx.token}
                // error={errorUpdate ? errorUpdate : {}}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
