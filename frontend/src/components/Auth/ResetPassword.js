import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../../util/usersReq";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./Auth.module.css";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const entEmail = emailRef.current.value;
    const res = await fetch(url + "auth/reset-password", {
      method: "POST",
      body: JSON.stringify({
        email: entEmail,
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
      setEmailSent(true);
    } catch (err) {
      setError({ ...err.data });
    }
  };
  return (
    <section className={classes.auth}>
      <h1>Reset your password</h1>
      {!emailSent && (
        <form onSubmit={formSubmit}>
          <div className={classes.control}>
            <input
              className={`${error ? classes.error : ""}`}
              placeholder="Please enter your email"
              ref={emailRef}
              type="email"
              id="email"
            />
            {error && (
              <span className={classes.error}>This email does not exist</span>
            )}
          </div>
          <div className={classes.actions}>
            {!isLoading && <button>Reset Password</button>}
            {isLoading && (
              <div className={classes.loadingContainer}>
                <button className={classes.loading}>
                  Please wait
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
              <Link to="/login">Cancel &times;</Link>
            </div>
          </div>
        </form>
      )}
      {emailSent && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          An email has been sent to the email provided.
        </div>
      )}
    </section>
  );
};

export default ResetPassword;
