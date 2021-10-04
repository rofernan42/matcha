import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, url } from "../../util/usersReq";
import containers from "./Profile.module.css";
import classes from "./Likes.module.css";
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
        setVisits(fetchedVisits.users.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, [props.token]);
  return (
    <div className={`${containers.profilePage} ${containers.likes}`}>
      <div className={classes.visits}>
        <div className={classes.visitsTitle}>They visited your profile...</div>
        <div>
          {(!visits || visits.length === 0) && (
            <div className={classes.noVisit}>
              No one has visited your profile for now.
            </div>
          )}
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
      <div className={containers.settingsField}>
        <div className={classes.listField}>
          <div className={classes.listTitle}>Profiles you liked</div>
          {(!usersLiked || usersLiked.length === 0) && (
            <div className={classes.noLike}>You haven't sent any like yet.</div>
          )}
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
          {(!usersLiking || usersLiking.length === 0) && (
            <div className={classes.noLike}>
              You haven't received any like yet.
            </div>
          )}
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
