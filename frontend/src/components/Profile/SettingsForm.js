import { useRef, useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./SettingsForm.module.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../store/currentUser-actions";

const SettingsForm = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.currentUser.data);
  const [error, setError] = useState(null);
  const usernameRef = useRef();
  const nameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const formSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const entUsername = usernameRef.current.value;
    const entName = nameRef.current.value;
    const entLastname = lastnameRef.current.value;
    const entEmail = emailRef.current.value;
    const entPassword = passwordRef.current.value;
    const test = await dispatch(
      updateUser({
        toUpdate: {
          username: entUsername,
          name: entName,
          lastname: entLastname,
          email: entEmail,
          password: entPassword,
        },
        path: "edit-settings",
        token: props.token,
      })
    );
    if (test) setError({ ...test });
    else toast.success("Settings edited successfully.");
    setIsLoading(false);
  };
  return (
    <div className={classes["edit-settings"]}>
      <div className={classes.header}>
        <div>Edit settings</div>
        <div className={isLoading ? classes.loading : classes.save} onClick={formSubmit}>
          {isLoading && (
            <>
              <LoadingSpinner
                styles={{
                  display: "inline-block",
                  verticalAlign: "bottom",
                  position: "relative",
                  marginLeft: "10px",
                  width: "20px",
                  height: "20px",
                }}
              />{" "}
            </>
          )}
          Save changes
        </div>
      </div>
      <form className={classes.formSettings}>
        <div className={classes.settings}>
          <div className={classes.label}>Username</div>
          <input
            className={`${error && error.errusername ? classes.error : ""}`}
            ref={usernameRef}
            placeholder="Enter username..."
            type="text"
            id="username"
            defaultValue={user && user.username}
          />
        </div>
        {error && error.errusername && (
          <span className={classes.error}>{error.errusername}</span>
        )}
        <div className={classes.settings}>
          <div className={classes.label}>Name</div>
          <input
            className={`${error && error.errname ? classes.error : ""}`}
            ref={nameRef}
            placeholder="Enter name..."
            type="text"
            id="name"
            defaultValue={user && user.name}
          />
        </div>
        {error && error.errname && (
          <span className={classes.error}>{error.errname}</span>
        )}
        <div className={classes.settings}>
          <div className={classes.label}>Last name</div>
          <input
            className={`${error && error.errlastname ? classes.error : ""}`}
            ref={lastnameRef}
            placeholder="Enter last name..."
            type="text"
            id="lastname"
            defaultValue={user && user.lastname}
          />
        </div>
        {error && error.errlastname && (
          <span className={classes.error}>{error.errlastname}</span>
        )}
        <div className={classes.settings}>
          <div className={classes.label}>Email</div>
          <input
            className={`${error && error.erremail ? classes.error : ""}`}
            ref={emailRef}
            placeholder="Enter email..."
            type="email"
            id="email"
            defaultValue={user && user.email}
          />
        </div>
        {error && error.erremail && (
          <span className={classes.error}>{error.erremail}</span>
        )}
        <div className={classes.settings}>
          <div className={classes.label}>Password*</div>
          <input
            className={`${error && error.errpassword ? classes.error : ""}`}
            ref={passwordRef}
            placeholder="Enter password..."
            type="password"
            id="password"
          />
        </div>
        <div className={classes.passInfo}>
          *Leave blank if you don't want to change it
        </div>
        {error && error.errpassword && (
          <span className={classes.error}>{error.errpassword}</span>
        )}
      </form>
    </div>
  );
};

export default SettingsForm;
