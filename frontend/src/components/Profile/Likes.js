import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../util/usersReq";
import classes from "./Interactions.module.css";
import profil from "../../images/blank-profile-picture.jpg";
import { url } from "../../util/utils";

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
    <div className={classes.likesContainer}>
      <div className={classes.likesField}>
        <div className={classes.listField}>
          <div className={classes.listTitle}>Profiles you liked</div>
          <div className={classes.listOption}>
            {(!usersLiked || usersLiked.length === 0) && (
              <div className={classes.noLike}>
                You haven't sent any like yet.
              </div>
            )}
            {usersLiked &&
              usersLiked.map((user) => {
                return (
                  <Link to={`/users/${user._id}`} key={user._id}>
                    <div className={classes.userCard}>
                      {user.image && <img alt="" src={url + user.image} />}
                      {!user.image && <img alt="" src={profil} />}
                      <div>{user.username}</div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
      <div className={classes.likesField}>
        <div className={classes.listField}>
          <div className={classes.listTitle}>They liked you</div>
          <div className={classes.listOption}>
            {(!usersLiking || usersLiking.length === 0) && (
              <div className={classes.noLike}>
                You haven't received any like yet.
              </div>
            )}
            {usersLiking &&
              usersLiking.map((user) => {
                return (
                  <Link to={`/users/${user._id}`} key={user._id}>
                    <div className={classes.userCard}>
                      {user.image && <img alt="" src={url + user.image} />}
                      {!user.image && <img alt="" src={profil} />}
                      <div>{user.username}</div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Likes;
