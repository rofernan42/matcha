import { useEffect, useState } from "react";
import { fetchUsers } from "../../util/usersReq";
import classes from "./Profile.module.css";

const Likes = (props) => {
  const [usersLiked, setUsersLiked] = useState(null);
  const [usersLiking, setUsersLiking] = useState(null);
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const fetchedLiked = await fetchUsers({
          token: props.token,
          path: "liked-users",
        });
        const fetchedLiking = await fetchUsers({
          token: props.token,
          path: "users-liking",
        });
        setUsersLiked(fetchedLiked.users);
        setUsersLiking(fetchedLiking.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, [props.token]);
  return (
    <div className={classes.profilePage}>
      <div className={classes.settingsField}>
        <div>
            Users I like
          {usersLiked &&
            usersLiked.map((user) => {
              return <div key={user._id}>{user.username}</div>;
            })}
        </div>
        <div>
            Users who like me
          {usersLiking &&
            usersLiking.map((user) => {
              return <div key={user._id}>{user.username}</div>;
            })}
        </div>
      </div>
    </div>
  );
};

export default Likes;
