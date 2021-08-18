import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact></Route>
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
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
