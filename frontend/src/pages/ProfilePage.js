import { useContext } from "react";
import Settings from "../components/Profile/Settings";
import Sidenav from "../components/Profile/Sidenav";
import AuthContext from "../store/auth-context";
import Blocked from "../components/Profile/Blocked";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/currentUser-actions";
import Interactions from "../components/Profile/Interactions";

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
          {loc.hash === "#blocks" && <Blocked token={authCtx.token} />}
        </>
      )}
    </>
  );
};

export default ProfilePage;
