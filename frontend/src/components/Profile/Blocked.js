import { useEffect, useState } from "react";
import { fetchUsers, userAction } from "../../util/usersReq";
import classes from "./Profile.module.css";

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
    await userAction({
      path: `block/${id}`,
      method: "DELETE",
      token: props.token,
    });
  };
  return (
    <div className={classes.profilePage}>
      <div className={classes.settingsField}>
        {(!usersBlocked || usersBlocked.length === 0) && (
          <div className={classes.noUser}>You haven't blocked any user.</div>
        )}
        {usersBlocked &&
          usersBlocked.map((user) => {
            return (
              <div key={user._id}>
                {user.username}{" "}
                <span onClick={() => unblockHandler(user._id)}>unblock</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Blocked;
