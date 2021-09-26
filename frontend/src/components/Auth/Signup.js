import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./Auth.module.css";
import { url } from "../../util/usersReq";
import { geolocUrl } from "../../util/geolocation";
import { toast } from "react-toastify";

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
    setIsLoading(true);
    const entUsername = usernameRef.current.value;
    const entName = nameRef.current.value;
    const entLastname = lastnameRef.current.value;
    const entEmail = emailRef.current.value;
    const entPassword = passwordRef.current.value;
    const coords = await fetch(geolocUrl);
    const coordsData = await coords.json();
    const res = await fetch(url + "auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username: entUsername,
        name: entName,
        lastname: entLastname,
        email: entEmail,
        password: entPassword,
        lat: coordsData.lat,
        lon: coordsData.lon,
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
      history.replace("/login");
      toast.success("Account created successfully.")
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
          {isLoading && (
            <div className={classes.loadingContainer}>
              <button className={classes.loading}>
                Creating...
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
            Already signed up ? <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Signup;
