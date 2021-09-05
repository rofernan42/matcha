import { useReducer, useRef, useState } from "react";
import { updateUser } from "../../util/usersReq";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./SettingsForm.module.css";

const getData = (state, action) => {
  if (action.type === "SUCCESS") {
    return { data: action.data, error: null };
  }
  if (action.type === "ERROR") {
    return { data: null, error: action.message };
  }
  return state;
};

const SettingsForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, dispatch] = useReducer(getData, {
    data: props.user,
    error: props.error,
  });
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
    try {
      const updatedUser = await updateUser({
        toUpdate: {
          username: entUsername,
          name: entName,
          lastname: entLastname,
          email: entEmail,
          password: entPassword,
        },
        path: "edit-settings",
        token: props.token,
      });
      dispatch({ type: "SUCCESS", data: updatedUser });
    } catch (err) {
      dispatch({ type: "ERROR", message: err.data || "Something went wrong." });
    }
    setIsLoading(false);
  };
  return (
    <section className={classes["edit-settings"]}>
      <h1>Account settings</h1>
      <form onSubmit={formSubmit}>
        <div className={classes.settings}>
          <div className={classes.label}>Username</div>
          <input
            className={`${user.error && user.error.errusername ? classes.error : ""}`}
            ref={usernameRef}
            placeholder="Enter username..."
            type="text"
            id="username"
            defaultValue={user.data && user.data.username}
          />
        </div>
        {user.error && user.error.errusername && (
          <span className={classes.error}>{user.error.errusername}</span>
        )}
        <div className={classes.settings}>
          <div className={classes.label}>Name</div>
          <input
            className={`${user.error && user.error.errname ? classes.error : ""}`}
            ref={nameRef}
            placeholder="Enter name..."
            type="text"
            id="name"
            defaultValue={user.data && user.data.name}
          />
        </div>
        {user.error && user.error.errname && (
          <span className={classes.error}>{user.error.errname}</span>
        )}
        <div className={classes.settings}>
          <div className={classes.label}>Last name</div>
          <input
            className={`${user.error && user.error.errlastname ? classes.error : ""}`}
            ref={lastnameRef}
            placeholder="Enter last name..."
            type="text"
            id="lastname"
            defaultValue={user.data && user.data.lastname}
          />
        </div>
        {user.error && user.error.errlastname && (
          <span className={classes.error}>{user.error.errlastname}</span>
        )}
        <div className={classes.settings}>
          <div className={classes.label}>Email</div>
          <input
            className={`${user.error && user.error.erremail ? classes.error : ""}`}
            ref={emailRef}
            placeholder="Enter email..."
            type="email"
            id="email"
            defaultValue={user.data && user.data.email}
          />
        </div>
        {user.error && user.error.erremail && (
          <span className={classes.error}>{user.error.erremail}</span>
        )}
        <div className={classes.settings}>
          <div className={classes.label}>Password*</div>
          <input
            className={`${user.error && user.error.errpassword ? classes.error : ""}`}
            ref={passwordRef}
            placeholder="Enter password..."
            type="password"
            id="password"
          />
        </div>
        <div className={classes.passInfo}>
          *Leave blank if you don't want to change it
        </div>
        {user.error && user.error.errpassword && (
          <span className={classes.error}>{user.error.errpassword}</span>
        )}
        <div className={classes.actions}>
          {!isLoading && <button>Edit</button>}
          {isLoading && (
            <button className={classes.loading}>
              Edit
              <LoadingSpinner
                styles={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  position: "relative",
                  marginLeft: "10px",
                  width: "20px",
                  height: "20px",
                }}
              />
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default SettingsForm;
