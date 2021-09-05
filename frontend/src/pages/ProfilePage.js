import { useContext, useEffect } from "react";
import Profile from "../components/Profile/Profile";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import { fetchCurrentUser, updateUser } from "../util/usersReq";

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const {
    sendReq,
    status,
    data: user,
  } = useHttp(fetchCurrentUser, true);
  const { sendReq: sendUpdate, data: updatedUser, error: errorUpdate } = useHttp(updateUser, true);

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
      {user && (
        <Profile
          user={updatedUser ? updatedUser : user.user}
          images={user.user.images}
          status={status}
          onChangeUser={updateUserHandler}
          token={authCtx.token}
          error={errorUpdate ? errorUpdate : {}}
        />
      )}
    </>
  );
};

export default ProfilePage;
