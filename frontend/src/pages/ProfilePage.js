import { useContext, useEffect, useState } from "react";
import Profile from "../components/Profile/Profile";
import AuthContext from "../store/auth-context";

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch("http://localhost:8000/profile", {
      headers: {
        Authorization: "Bearer " + authCtx.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [authCtx.token]);
  return <Profile user={user} />;
};

export default ProfilePage;
