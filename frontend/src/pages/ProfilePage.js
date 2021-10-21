import { useContext } from "react";
import Settings from "../components/Profile/Settings";
import Sidenav from "../components/Profile/Sidenav";
import AuthContext from "../store/auth-context";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/currentUser-actions";
import Interactions from "../components/Profile/Interactions";
import AllNotifs from "../components/Profile/AllNotifs";

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const loc = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.data);

  const updateUserHandler = (attr) => {
    dispatch(
      updateUser({
        token: authCtx.token,
        ...attr,
      })
    );
  };
  return (
    <>
      {currentUser && (
        <>
          <Sidenav userId={currentUser._id} />
          {loc.hash === "" && (
            <Settings
              onChangeUser={updateUserHandler}
              token={authCtx.token}
              user={currentUser}
            />
          )}
          {loc.hash === "#interactions" && (
            <Interactions token={authCtx.token} />
          )}
          {loc.hash === "#notifs" && <AllNotifs token={authCtx.token} />}
        </>
      )}
    </>
  );
};

export default ProfilePage;
