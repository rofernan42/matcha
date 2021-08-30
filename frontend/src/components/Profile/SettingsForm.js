import { useRef, useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./SettingsForm.module.css";
import btn from "./Profile.module.css";

const SettingsForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const usernameRef = useRef();
  const nameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const formSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const entUsername = usernameRef.current.value;
    const entName = nameRef.current.value;
    const entLastname = lastnameRef.current.value;
    const entEmail = emailRef.current.value;
    const entPassword = passwordRef.current.value;
    props.onChangeSettings({
      toUpdate: {
        username: entUsername,
        name: entName,
        lastname: entLastname,
        email: entEmail,
        password: entPassword,
      },
      path: "edit-settings",
    });
    setIsLoading(false);
  };
  return (
    <section className={classes["edit-settings"]}>
      <h1>Account settings</h1>
      <form onSubmit={formSubmit}>
        <div className={classes.settings}>
          <input
            className={`${props.error.errusername ? classes.error : ""}`}
            ref={usernameRef}
            placeholder="Username"
            type="text"
            id="username"
            defaultValue={props.user.username}
          />
          {props.error.errusername && (
            <span className={classes.error}>{props.error.errusername}</span>
          )}
        </div>
        <div className={classes.settings}>
          <input
            className={`${props.error.errname ? classes.error : ""}`}
            ref={nameRef}
            placeholder="Name"
            type="text"
            id="name"
            defaultValue={props.user.name}
          />
          {props.error.errname && (
            <span className={classes.error}>{props.error.errname}</span>
          )}
        </div>
        <div className={classes.settings}>
          <input
            className={`${props.error.errlastname ? classes.error : ""}`}
            ref={lastnameRef}
            placeholder="Last name"
            type="text"
            id="lastname"
            defaultValue={props.user.lastname}
          />
          {props.error.errlastname && (
            <span className={classes.error}>{props.error.errlastname}</span>
          )}
        </div>
        <div className={classes.settings}>
          <input
            className={`${props.error.erremail ? classes.error : ""}`}
            ref={emailRef}
            placeholder="Email"
            type="email"
            id="email"
            defaultValue={props.user.email}
          />
          {props.error.erremail && (
            <span className={classes.error}>{props.error.erremail}</span>
          )}
        </div>
        <div className={classes.settings}>
          <input
            className={`${props.error.errpassword ? classes.error : ""}`}
            ref={passwordRef}
            placeholder="Password (leave blank if you don't want to change it)"
            type="password"
            id="password"
          />
          {props.error.errpassword && (
            <span className={classes.error}>{props.error.errpassword}</span>
          )}
        </div>
        <div className={classes.settings}>
          {!isLoading && <button className={`${btn.active} ${btn.selected}`}>Edit</button>}
          {isLoading && <LoadingSpinner />}
          {/* <button type="button" className={classes.toggle}></button> */}
        </div>
      </form>
    </section>
  );
};

export default SettingsForm;
