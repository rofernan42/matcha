import { useEffect, useState } from "react";
import { fetchUsers } from "../../util/usersReq";
import { userAction } from "../../store/currentUser-actions";
import classes from "./Interactions.module.css";
import profil from "../../images/blank-profile-picture.jpg";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { url } from "../../util/utils";
import { useDispatch } from "react-redux";

const Blocked = (props) => {
  const dispatch = useDispatch();
  const [usersBlocked, setUsersBlocked] = useState(null);
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const fetchedBlocked = await fetchUsers({
          token: props.token,
          path: "blocked-users",
        });
        setUsersBlocked(fetchedBlocked.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, [props.token]);

  const unblockHandler = async (id) => {
    const data = await dispatch(
      userAction({
        path: `block/${id}`,
        method: "DELETE",
        token: props.token,
      })
    );
    setUsersBlocked(data.users);
    toast.success("User unblocked!");
  };
  return (
    <div className={classes.likesContainer}>
      <div className={classes.likesField}>
        <div className={classes.listField}>
          <div className={classes.listTitle}>Users you blocked</div>
          <div className={classes.listOption}>
            {(!usersBlocked || usersBlocked.length === 0) && (
              <div className={classes.noLike}>
                You haven't blocked any user.
              </div>
            )}
            {usersBlocked &&
              usersBlocked.length > 0 &&
              usersBlocked.map((user) => {
                return (
                  <div
                    className={classes.userCard}
                    key={user._id}
                    onClick={() => unblockHandler(user._id)}
                  >
                    {user.image && <img alt="" src={url + user.image} />}
                    {!user.image && <img alt="" src={profil} />}
                    <div>{user.username}</div>
                    <button className={classes.unblockField}>Unblock</button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blocked;
