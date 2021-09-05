import {
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./store/auth-context";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import UsersPage from "./pages/UsersPage";

import socket from "./util/socket";
import { store } from "react-notifications-component";

function App() {
  const authCtx = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const history = useHistory();
  // function success(pos) {
  //   var crd = pos.coords;

  //   console.log('Your current position is:');
  //   console.log(`Latitude : ${crd.latitude}`);
  //   console.log(`Longitude: ${crd.longitude}`);
  //   console.log(`More or less ${crd.accuracy} meters.`);
  // }

  // function error(err) {
  //   console.warn(`ERROR(${err.code}): ${err.message}`);
  // }

  // navigator.geolocation.getCurrentPosition(success, error);

  useEffect(() => {
    if (authCtx.userId) {
      socket.emit("addUser", authCtx.userId);
      socket.off("getUsers").on("getUsers", (users) => {
        setOnlineUsers(users);
        // console.log(users);
      });
    }
  }, [authCtx.userId]);
  useEffect(() => {
    if (authCtx.userId) {
      socket.off("notif").on("notif", (data) => {
        if (data) {
          store.addNotification({
            title: data.message,
            message: "lalala",
            type: data.type,
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: false,
            },
          });
        }
      });
      // socket.off("actualise").on("actualise", () => {
      //   console.log("actualise");
      //   history.go(0);
      // });
    }
  }, [authCtx.userId]);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage isAuth={authCtx.isAuth} />
        </Route>
        {!authCtx.isAuth && (
          <Route path="/signup" exact>
            <SignupPage />
          </Route>
        )}
        {!authCtx.isAuth && (
          <Route path="/login" exact>
            <LoginPage />
          </Route>
        )}
        {authCtx.isAuth && (
          <Route path="/profile" exact>
            <ProfilePage />
          </Route>
        )}
        {authCtx.isAuth && (
          <Route path="/chat" exact>
            <ChatPage onlineUsers={onlineUsers} />
          </Route>
        )}
        {authCtx.isAuth && (
          <Route path="/users">
            <UsersPage onlineUsers={onlineUsers} />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
