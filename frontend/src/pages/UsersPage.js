import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import UserCard from "../components/Users/UserCard";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import { fetchCurrentUser, fetchUsers } from "../util/usersReq";
import classes from "./Pages.module.css";
import ProfileCard from "../components/Users/ProfileCard";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import Filters from "../components/Users/Filters";

const UsersPage = (props) => {
  const loc = useLocation();
  const authCtx = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({
    display: false,
    profile: null,
  });
  const { sendReq, status, data: usersData, error } = useHttp(fetchUsers, true);
  const { sendReq: sendReqCurrentUser, data: currentUser } = useHttp(
    fetchCurrentUser,
    true
  );
  useEffect(() => {
    sendReq({ token: authCtx.token, path: "filtered-users" + loc.search });
    sendReqCurrentUser(authCtx.token);
  }, [sendReq, sendReqCurrentUser, authCtx.token, loc.search]);
  if (error) {
    return <p className={classes.error}>{error}</p>;
  }
  const profileCardHandler = (user) => {
    sendReqCurrentUser(authCtx.token);
    setUserProfile({ display: true, profile: user });
  };
  const closeProfileHandler = () => {
    setUserProfile({ display: false, profile: null });
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.filters}>
          <Filters />
        </div>
        <div className={classes["users-list"]}>
          {!usersData && (
            <LoadingSpinner
              styles={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%)`,
                width: "200px",
                height: "200px",
              }}
            />
          )}
          {status === "completed" &&
            (!usersData || usersData.users.length === 0) && (
              <p className={classes.error}>No user found.</p>
            )}
          {usersData &&
            usersData.users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onProfileCard={profileCardHandler}
                online={props.onlineUsers.some(
                  (e) => e.userId === user._id.toString()
                )}
              />
            ))}
        </div>

        <div className={classes.pagination}>
          {usersData && (
            <Pagination
              lastPage={Math.ceil(usersData.totalItems / usersData.perPage)}
            />
          )}
        </div>
      </div>
      {userProfile.display && currentUser && (
        <ProfileCard
          key={userProfile.profile._id}
          onCloseProfile={closeProfileHandler}
          user={userProfile.profile}
          token={authCtx.token}
          liked={currentUser.likes.includes(userProfile.profile._id)}
          online={props.onlineUsers.some(
            (e) => e.userId === userProfile.profile._id.toString()
          )}
        />
      )}
    </>
  );
};

export default UsersPage;
