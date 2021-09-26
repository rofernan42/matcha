import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, url } from "../../util/usersReq";
import classes from "./Profile.module.css";
import profil from "../../images/blank-profile-picture.jpg";

const Likes = (props) => {
  const [usersLiked, setUsersLiked] = useState(null);
  const [usersLiking, setUsersLiking] = useState(null);
  const [visits, setVisits] = useState(null);
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
        const fetchedVisits = await fetchUsers({
          token: props.token,
          path: "visits",
        });
        setUsersLiked(fetchedLiked.users);
        setUsersLiking(fetchedLiking.users);
        setVisits(fetchedVisits.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, [props.token]);
  return (
    <div className={`${classes.profilePage} ${classes.likes}`}>
      <div className={classes.visits}>
        <div className={classes.visitsTitle}>They visited your profile...</div>
        <div>
          {visits &&
            visits.map((visit) => {
              return (
                <Link
                  to={`/users/${visit._id}`}
                  key={visit._id}
                  className={classes.visitOption}
                >
                  {visit.image && <img alt="" src={url + visit.image} />}
                  {!visit.image && <img alt="" src={profil} />}
                </Link>
              );
            })}
        </div>
      </div>
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
                  {user.image && <img alt="" src={url + user.image} />}
                  {!user.image && <img alt="" src={profil} />}
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
