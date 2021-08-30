import { useContext, useEffect } from "react";
import Profile from "../components/Profile/Profile";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import { fetchCurrentUser, updateImage, updateUser } from "../util/usersReq";

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const {
    sendReq,
    status,
    data: user,
    error,
  } = useHttp(fetchCurrentUser, true);
  const { sendReq: sendUpdate, data: updatedUser, error: errorUpdate } = useHttp(updateUser, true);
  const {
    sendReq: sendImage,
    statusImages,
    data: updatedImages,
  } = useHttp(updateImage, true);

  const updateUserHandler = (attr) => {
    sendUpdate({
      token: authCtx.token,
      ...attr,
    });
  };
  const imgHandler = (img) => {
    sendImage({ token: authCtx.token, ...img });
  };

  useEffect(() => {
    sendReq(authCtx.token);
  }, [sendReq, authCtx.token]);

  if (status === "pending") {
    return <LoadingSpinner loadingScreen={true} />;
  }
  return (
    <>
      {user && (
        <Profile
          user={updatedUser ? updatedUser : user}
          images={updatedImages ? updatedImages.images : user.images}
          status={status}
          onChangeUser={updateUserHandler}
          onChangeImg={imgHandler}
          statusImg={statusImages}
          error={errorUpdate ? errorUpdate : {}}
        />
      )}
    </>
  );
};

export default ProfilePage;
