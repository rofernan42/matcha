import { Switch, Route, Redirect } from "react-router-dom";
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
import UserProfile from "./components/Users/UserProfile/UserProfile";
import ResetPassword from "./components/Auth/ResetPassword";
import NewPassword from "./components/Auth/NewPassword";
import { toast } from "react-toastify";

function App() {
  const authCtx = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([]);

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
      socket.off("notifMatch").on("notifMatch", (data) => {
        if (data) {
          toast(data.message, {
            style: { backgroundColor: "#9f5ccc", color: "white" },
          });
        }
      });
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
        {!authCtx.isAuth && (
          <Route path="/reset-password" exact>
            <ResetPassword />
          </Route>
        )}
        {!authCtx.isAuth && (
          <Route path="/reset-password/:token">
            <NewPassword />
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
          <Switch>
            <Route path="/users" exact>
              <UsersPage onlineUsers={onlineUsers} />
            </Route>
            <Route path="/users/:userId">
              <UserProfile onlineUsers={onlineUsers} />
            </Route>
          </Switch>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
