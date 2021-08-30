import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <>
      {/* {props.loadingScreen && <div className={classes["loading-screen"]} />} */}
      {/* <div
        className={`${classes.spinner} ${
          props.loadingScreen ? classes.margin : ""
        }`}
      ></div> */}
      <div className={classes["spinner"]} style={props.styles}>
        <div className={classes["double-bounce1"]}></div>
        <div className={classes["double-bounce2"]}></div>
      </div>
    </>
  );
};

export default LoadingSpinner;
