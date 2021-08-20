import { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./Auth.module.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const formSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const entEmail = emailRef.current.value;
    const entPassword = passwordRef.current.value;
    const res = await fetch("http://localhost:8000/auth/login", {
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
      let data;
      if (res.ok) {
        data = await res.json();
      } else {
        data = await res.json();
        throw new Error(data.message);
      }
      console.log(data);
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      authCtx.login(data.token, data.userId, expirationTime.toISOString());
      history.replace("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={formSubmit}>
        <div className={classes.control}>
          <input placeholder="Email" ref={emailRef} type="email" id="email" />
        </div>
        <div className={classes.control}>
          <input
            placeholder="Password"
            ref={passwordRef}
            type="password"
            id="password"
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Login</button>}
          {isLoading && <LoadingSpinner />}
          <div className={classes.footer}>
            I don't have an account. <Link to="/signup">Sign up</Link>
          </div>
          <div className={classes.footer}>
            <Link to="/reset-password">I forgot my password.</Link>
          </div>
          {/* <button type="button" className={classes.toggle}></button> */}
        </div>
      </form>
    </section>
  );
};

export default Login;
