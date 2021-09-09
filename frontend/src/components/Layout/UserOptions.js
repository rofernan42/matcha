import { NavLink } from "react-router-dom";
import classes from "./Nav.module.css";

const UserOptions = (props) => {
  return (
    <div
      className={classes.currentUserOptions}
      onClick={(e) => e.stopPropagation()}
    >
      <NavLink
        className={classes.optionLink}
        activeClassName={classes.active}
        to="/profile"
      >
        <div className={classes.dropDownOption}>See profile</div>
      </NavLink>
      <div className={classes.dropDownOption} onClick={props.onLogout}>
        Log out
      </div>
    </div>
  );
};

export default UserOptions;
