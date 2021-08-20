import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./Auth.module.css";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const usernameRef = useRef();
  const nameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const formSubmit = async (e) => {
    e.preventDefault();
    // setError({});
    setIsLoading(true);
    const entUsername = usernameRef.current.value;
    const entName = nameRef.current.value;
    const entLastname = lastnameRef.current.value;
    const entEmail = emailRef.current.value;
    const entPassword = passwordRef.current.value;
    const res = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username: entUsername,
        name: entName,
        lastname: entLastname,
        email: entEmail,
        password: entPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    try {
      let data;
      if (res.ok) {
        data = await res.json();
      } else {
        data = await res.json();
        const error = new Error("Something went wrong");
        error.data = data;
        throw error;
      }
      console.log(data);
      // if (data && data.token) {
      //   authCtx.login(data.token);
      // }
      history.replace("/login");
    } catch (err) {
      console.log({ ...err.data.message });
      setError({ ...err.data.message });
    }
  };
  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form onSubmit={formSubmit}>
        <div className={classes.control}>
          <input
            className={`${error.errusername ? classes.error : ""}`}
            ref={usernameRef}
            placeholder="Username"
            type="text"
            id="username"
          />
          {error.errusername && (
            <span className={classes.error}>{error.errusername}</span>
          )}
        </div>
        <div className={classes.control}>
          <input
            className={`${error.errname ? classes.error : ""}`}
            ref={nameRef}
            placeholder="Name"
            type="text"
            id="name"
          />
          {error.errname && (
            <span className={classes.error}>{error.errname}</span>
          )}
        </div>
        <div className={classes.control}>
          <input
            className={`${error.errlastname ? classes.error : ""}`}
            ref={lastnameRef}
            placeholder="Last name"
            type="text"
            id="lastname"
          />
          {error.errlastname && (
            <span className={classes.error}>{error.errlastname}</span>
          )}
        </div>
        <div className={classes.control}>
          <input
            className={`${error.erremail ? classes.error : ""}`}
            ref={emailRef}
            placeholder="Email"
            type="email"
            id="email"
          />
          {error.erremail && (
            <span className={classes.error}>{error.erremail}</span>
          )}
        </div>
        <div className={classes.control}>
          <input
            className={`${error.errpassword ? classes.error : ""}`}
            ref={passwordRef}
            placeholder="Password"
            type="password"
            id="password"
          />
          {error.errpassword && (
            <span className={classes.error}>{error.errpassword}</span>
          )}
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Create account</button>}
          {isLoading && <LoadingSpinner />}
          <div className={classes.footer}>
            Already signed up ? <Link to="/login">Login</Link>
          </div>
          {/* <button type="button" className={classes.toggle}></button> */}
        </div>
      </form>
    </section>
  );
};

export default Signup;
