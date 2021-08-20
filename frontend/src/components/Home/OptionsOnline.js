import { Link } from "react-router-dom";
import classes from "./Home.module.css";

const OptionsOnline = (props) => {
  return (
    <div className={classes.options}>
      <Link to="/users">
        Start searching
      </Link>
    </div>
  );
};

export default OptionsOnline;
