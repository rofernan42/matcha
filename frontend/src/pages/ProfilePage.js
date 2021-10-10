import { useContext } from "react";
import Settings from "../components/Profile/Settings";
import Sidenav from "../components/Profile/Sidenav";
import AuthContext from "../store/auth-context";
import classes from "./Pages.module.css";
import Options from "../components/Profile/Options";
import Likes from "../components/Profile/Likes";
import Blocked from "../components/Profile/Blocked";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/currentUser-actions";

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
      <div className={classes.profilePage}></div>
      {currentUser && (
        <>
          <Sidenav userId={currentUser._id} />
          {loc.hash === "" && (
            <>
              <Settings
                onChangeUser={updateUserHandler}
                token={authCtx.token}
              />
              <Options
                user={currentUser}
                onChangeUser={updateUserHandler}
                token={authCtx.token}
              />
            </>
          )}
          {loc.hash === "#likes" && <Likes token={authCtx.token} />}
          {loc.hash === "#blocks" && <Blocked token={authCtx.token} />}
        </>
      )}
    </>
  );
};

export default ProfilePage;
