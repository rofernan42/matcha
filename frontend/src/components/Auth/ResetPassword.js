import { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { url } from "../../util/usersReq";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./Auth.module.css";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const formSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const entEmail = emailRef.current.value;
    const entPassword = passwordRef.current.value;
    fetch(url + "auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: entEmail,
        password: entPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
        authCtx.login(data.token);
        history.replace("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
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

export default ResetPassword;
