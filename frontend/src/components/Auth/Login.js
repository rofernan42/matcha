import { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { url } from "../../util/usersReq";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./Auth.module.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  // const btnClasses = {isLoading }

  const formSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const entEmail = emailRef.current.value;
    const entPassword = passwordRef.current.value;
    const res = await fetch(url + "auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: entEmail,
        password: entPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    try {
      const data = await res.json();
      if (!res.ok) {
        const error = new Error("Something went wrong");
        error.data = data;
        throw error;
      }
      console.log(data);
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      authCtx.login(data.token, data.userId, expirationTime.toISOString());
      history.replace("/");
    } catch (err) {
      setError({ ...err.data });
    }
  };
  return (
    <section className={classes.auth}>
      <h1>Log in</h1>
      <form onSubmit={formSubmit}>
        <div className={classes.control}>
          <input
            className={`${error ? classes.error : ""}`}
            placeholder="Email"
            ref={emailRef}
            type="email"
            id="email"
          />
        </div>
        <div className={classes.control}>
          <input
            className={`${error ? classes.error : ""}`}
            placeholder="Password"
            ref={passwordRef}
            type="password"
            id="password"
          />
          {error && (
            <span className={classes.error}>Wrong email or password</span>
          )}
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Log in</button>}
          {isLoading && (
            <div className={classes.loadingContainer}>
              <button className={classes.loading}>
                Logging in
                <LoadingSpinner
                  styles={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    position: "relative",
                    marginLeft: "15px",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </button>
            </div>
          )}
          <div className={classes.footer}>
            I don't have an account. <Link to="/signup">Sign up</Link>
          </div>
          <div className={classes.footer}>
            <Link to="/reset-password">I forgot my password.</Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
