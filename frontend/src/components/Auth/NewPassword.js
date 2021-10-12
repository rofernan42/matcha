import { useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { url } from "../../util/utils";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./Auth.module.css";

const NewPassword = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const passwordRef = useRef();
  const repPasswordRef = useRef();
  const history = useHistory();

  const formSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const entPassword = passwordRef.current.value;
    const entRepPassword = repPasswordRef.current.value;
    const res = await fetch(url + `auth/new-password/${params.token}`, {
      method: "POST",
      body: JSON.stringify({
        password: entPassword,
        repPassword: entRepPassword,
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
      history.replace("/login");
    } catch (err) {
      setError(err.data.message);
    }
  };
  return (
    <section className={classes.auth}>
      <h1>New Password</h1>
      <form onSubmit={formSubmit}>
        <div className={classes.control}>
          <input
            className={`${error ? classes.error : ""}`}
            placeholder="Type your new password..."
            ref={passwordRef}
            type="password"
            id="password"
          />
        </div>
        <div className={classes.control}>
          <input
            className={`${error ? classes.error : ""}`}
            placeholder="Confirm password..."
            ref={repPasswordRef}
            type="password"
            id="repPassword"
          />
        </div>
        {error && <div className={classes.errorMsg}>{error}</div>}
        <div className={classes.actions}>
          {!isLoading && <button>Set Password</button>}
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
        </div>
      </form>
    </section>
  );
};

export default NewPassword;
