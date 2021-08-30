import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Nav.module.css";

const Nav = () => {
  const authCtx = useContext(AuthContext);
  const isAuth = authCtx.isAuth;
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink activeClassName={classes.active} to="/" exact>
          Matcha
        </NavLink>
      </div>
      <nav>
        <ul>
          {isAuth && (
            <li>
              <NavLink activeClassName={classes.active} to="/chat">
                Matches
              </NavLink>
            </li>
          )}
          {!isAuth && (
            <li>
              <NavLink activeClassName={classes.active} to="/login">
                Login
              </NavLink>
            </li>
          )}
          {!isAuth && (
            <li>
              <NavLink activeClassName={classes.active} to="/signup">
                <button>Sign up</button>
              </NavLink>
            </li>
          )}
          {isAuth && (
            <li>
              <NavLink activeClassName={classes.active} to="/profile">
                Profile
              </NavLink>
            </li>
          )}
          {isAuth && (
            <li>
              <button type="button" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
