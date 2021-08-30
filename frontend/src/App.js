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

function App() {
  const authCtx = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (authCtx.userId) {
      socket.emit("addUser", authCtx.userId);
      socket.off("getUsers").on("getUsers", (users) => {
        setOnlineUsers(users);
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
