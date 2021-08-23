import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import UserCard from "../components/Users/UserCard";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import { fetchUsers } from "../util/usersReq";
import classes from "../components/Users/UserCard.module.css";
import ProfileCard from "../components/Users/ProfileCard";
import ImageSlider from "../components/Users/ImageSlider";

const UsersPage = () => {
  const authCtx = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({
    display: false,
    profile: null,
  });
  const { sendReq, status, data: users, error } = useHttp(fetchUsers, true);
  useEffect(() => {
    sendReq(authCtx.token);
  }, [sendReq, authCtx.token]);
  if (status === "pending") {
    return <LoadingSpinner loadingScreen={true} />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (status === "completed" && (!users || users.length === 0)) {
    return <p>No user found.</p>;
  }
  const profileCardHandler = (user) => {
    setUserProfile({ display: true, profile: user });
  };
  const closeProfileHandler = () => {
    setUserProfile({ display: false, profile: null });
  };
  const imgs = users[0].images.filter((img) => img !== null);
  return (
    <>
      <div className={classes["users-list"]}>
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onProfileCard={profileCardHandler}
          />
        ))}
      </div>
      {userProfile.display && (
        <ProfileCard
          onCloseProfile={closeProfileHandler}
          user={userProfile.profile}
        />
      )}
      {/* <ImageSlider images={imgs} /> */}
    </>
  );
};

export default UsersPage;
