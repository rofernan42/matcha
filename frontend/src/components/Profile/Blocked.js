import { useEffect, useState } from "react";
import { fetchUsers, url, userAction } from "../../util/usersReq";
import containers from "./Profile.module.css";
import classes from "./Likes.module.css";
import profil from "../../images/blank-profile-picture.jpg";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Blocked = (props) => {
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
    const data = await userAction({
      path: `block/${id}`,
      method: "DELETE",
      token: props.token,
    });
    setUsersBlocked(data.users);
    toast.success("User unblocked!");
  };
  return (
    <div className={containers.profilePage}>
      <div className={containers.settingsField}>
        {(!usersBlocked || usersBlocked.length === 0) && (
          <div className={classes.noBlock}>You haven't blocked any user.</div>
        )}
        {usersBlocked && usersBlocked.length > 0 && (
          <div className={classes.listField}>
            <div className={classes.listTitle}>Users blocked</div>
            {usersBlocked.map((user) => {
              return (
                <div className={classes.listOption} key={user._id}>
                  {user.image && <img alt="" src={url + user.image} />}
                  {!user.image && <img alt="" src={profil} />}
                  <span>{user.username}</span>
                  <button onClick={() => unblockHandler(user._id)}>
                    Unblock
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blocked;
