import { useContext, useEffect } from "react";
import Profile from "../components/Profile/Profile";
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
  const {
    sendReq: sendUpdate,
    data: updatedUser
  } = useHttp(updateUser, true);
  const {
    sendReq: sendImage,
    data: updatedImages
  } = useHttp(updateImage, true);

  useEffect(() => {
    sendReq(authCtx.token);
  }, [sendReq, authCtx.token]);

  const genderHandler = (gender) => {
    sendUpdate({
      token: authCtx.token,
      toUpdate: gender,
      path: "change-gender",
    });
  };
  const attrHandler = (attr) => {
    sendUpdate({
      token: authCtx.token,
      toUpdate: attr,
      path: "change-attraction",
    });
  };
  const bioHandler = (bio) => {
    sendUpdate({ token: authCtx.token, toUpdate: bio, path: "change-bio" });
  };
  const imgHandler = (img) => {
    sendImage({ token: authCtx.token, ...img });
  };
  return (
    <>
      {user && (
        <Profile
          user={updatedUser ? updatedUser : user}
          images={updatedImages ? updatedImages.images : user.images}
          status={status}
          onChangeGender={genderHandler}
          onChangeAttr={attrHandler}
          onChangeBio={bioHandler}
          onChangeImg={imgHandler}
        />
      )}
    </>
  );
};

export default ProfilePage;
