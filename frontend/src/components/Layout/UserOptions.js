import { NavLink } from "react-router-dom";
import classes from "./Nav.module.css";
import profil from "../../images/profil.png";
import logout from "../../images/log-out.png";

const UserOptions = (props) => {
  return (
    <div className={classes.currentUserOptions}>
      <NavLink
        className={classes.optionLink}
        activeClassName={classes.active}
        to="/profile"
      >
        <div className={classes.dropDownOption}>
          <img alt="" src={profil} />
          <span>See profile</span>
        </div>
      </NavLink>
      <div className={classes.dropDownOption} onClick={props.onLogout}>
        <img alt="" src={logout} />
        <span>Log out</span>
      </div>
    </div>
  );
};

export default UserOptions;
