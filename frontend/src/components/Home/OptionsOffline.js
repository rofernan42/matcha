import { Link } from "react-router-dom";
import classes from "./Home.module.css";

const OptionsOffline = () => {
  return (
    <div className={classes.options}>
      <Link to="/login">
        Login
      </Link>
      <Link to="/signup">
        Sign Up
      </Link>
    </div>
  );
};

export default OptionsOffline;
