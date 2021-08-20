import { useContext, useEffect } from "react";
import Profile from "../components/Profile/Profile";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import { fetchCurrentUser, updateGender } from "../util/usersReq";

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const {
    sendReq,
    status,
    data: user,
    error,
  } = useHttp(fetchCurrentUser, true);

  useEffect(() => {
    sendReq(authCtx.token);
  }, [sendReq, authCtx.token]);

  const genderHandler = (gender) => {
    updateGender({ token: authCtx.token, gender });
  };
  return <>{user && <Profile user={user} onChangeGender={genderHandler} />}</>;
};

export default ProfilePage;
