import { useContext, useEffect, useReducer, useState } from "react";
import Settings from "../components/Profile/Settings";
import Sidenav from "../components/Profile/Sidenav";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import classes from "./Pages.module.css";
import { fetchCurrentUser, fetchUsers, updateUser } from "../util/usersReq";
import Options from "../components/Profile/Options";

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
  // const [blockedUsers, setBlockedUsers] = useState(null);
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

  // useEffect(() => {
  //   const fetchAll = async () => {
  //     const fetchBlocked = await fetchUsers({
  //       token: authCtx.token,
  //       path: "blocked-users",
  //     });
  //     const fetchLiked = await fetchUsers({
  //       token: authCtx.token,
  //       path: "liked-users",
  //     });
  //     const fetchLiking = await fetchUsers({
  //       token: authCtx.token,
  //       path: "users-liking",
  //     });
  //     setBlockedUsers(fetchBlocked);
  //   };
  //   fetchAll();
  // }, [authCtx.token]);

  return (
    <>
      <div className={classes.profilePage}>
        {user && (
          <>
            <Sidenav onChangePage={changePage} />
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
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
