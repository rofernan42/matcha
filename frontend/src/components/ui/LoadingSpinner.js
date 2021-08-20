import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <>
      {props.loadingScreen && <div className={classes["loading-screen"]} />}
      <div
        className={`${classes.spinner} ${
          props.loadingScreen ? classes.margin : ""
        }`}
      ></div>
    </>
  );
};

export default LoadingSpinner;
