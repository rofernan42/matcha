import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, url } from "../../util/usersReq";
import classes from "./Profile.module.css";
import profil from "../../images/blank-profile-picture.jpg";

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
        <div className={classes.listField}>
          <div className={classes.listTitle}>Profiles you liked</div>
          {usersLiked &&
            usersLiked.map((user) => {
              return (
                <Link
                  to={`/users/${user._id}`}
                  key={user._id}
                  className={classes.listOption}
                >
                  {user.image && <img alt="" src={url + user.image} />}
                  {!user.image && <img alt="" src={profil} />}
                  <span>{user.username}</span>
                </Link>
              );
            })}
        </div>
        <div className={classes.listField}>
          <div className={classes.listTitle}>They liked you</div>
          {usersLiking &&
            usersLiking.map((user) => {
              return (
                <Link
                  to={`/users/${user._id}`}
                  key={user._id}
                  className={classes.listOption}
                >
                  <img alt="" src={url + user.image} />
                  <span>{user.username}</span>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Likes;
