import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import UsersPage from "./pages/UsersPage";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage isAuth={authCtx.isAuth} />
        </Route>
        {!authCtx.isAuth && (
          <Route path="/signup">
            <SignupPage />
          </Route>
        )}
        {!authCtx.isAuth && (
          <Route path="/login">
            <LoginPage />
          </Route>
        )}
        {authCtx.isAuth && (
          <Route path="/profile">
            <ProfilePage />
          </Route>
        )}
        {authCtx.isAuth && (
          <Route path="/chat">
            <ChatPage />
          </Route>
        )}
        <Route path="/users">
          <UsersPage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
