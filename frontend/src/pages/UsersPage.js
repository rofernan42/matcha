import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import UserCard from "../components/Users/UserCard";
import AuthContext from "../store/auth-context";
import { fetchUsers } from "../util/usersReq";
import classes from "./Pages.module.css";
import ProfileCard from "../components/Users/ProfileCard";
import { useLocation } from "react-router-dom";
import Pagination from "../components/ui/Pagination";
import Filters from "../components/Users/Filters";
import searchIcon from "../images/search.png";
import filter from "../images/filter.png";
import { useSelector } from "react-redux";

const UsersPage = (props) => {
  const perPage = 5;
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const authCtx = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [userProfile, setUserProfile] = useState({
    display: false,
    profile: null,
  });
  const [usersData, setUsersData] = useState(null);
  const [usernameFilter, setUsernameFilter] = useState([]);
  const [filtersMenu, setFiltersMenu] = useState(false);
  const currentUser = useSelector((state) => state.currentUser.data);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers({
        token: authCtx.token,
        path: "filtered-users" + loc.search,
      });
      setUsersData(users.users);
      setUsernameFilter(users.users);
    };
    getUsers();
  }, []);

  const filtersHandler = async (queries) => {
    const users = await fetchUsers({
      token: authCtx.token,
      path: "filtered-users" + queries,
    });
    setUsersData(users.users);
  };

  const profileCardHandler = (user) => {
    setUserProfile({ display: true, profile: user });
  };
  const closeProfileHandler = () => {
    setUserProfile({ display: false, profile: null });
  };

  useEffect(() => {
    setUsernameFilter(
      usersData && usersData.filter((usr) => usr.username.includes(search))
    );
  }, [search, usersData]);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.filtersContainer}>
          <div className={classes.searchField}>
            <img alt="" src={searchIcon} />
            <input
              type="text"
              placeholder="search a user"
              className={classes.searchInput}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div
            className={classes.filtersIcon}
            onClick={() => setFiltersMenu(true)}
          >
            <img alt="" src={filter} />
          </div>
        </div>
        {usersData && usernameFilter && (
          <Pagination lastPage={Math.ceil(usernameFilter.length / perPage)} />
        )}
        <div className={classes["users-list"]}>
          {!usersData && (
            <LoadingSpinner
              styles={{
                position: "relative",
                top: "40vh",
                left: "50%",
                transform: `translate(-50%, -50%)`,
                width: "200px",
                height: "200px",
              }}
            />
          )}
          {usernameFilter &&
            usernameFilter.slice(
              ((+queryParams.get("page") || 1) - 1) * perPage,
              (+queryParams.get("page") || 1) * perPage
            ).length === 0 && <p className={classes.error}>No user found.</p>}
          {usernameFilter &&
            currentUser &&
            usernameFilter
              .slice(
                ((+queryParams.get("page") || 1) - 1) * perPage,
                (+queryParams.get("page") || 1) * perPage
              )
              .map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  currentLoc={{
                    lat: currentUser.lat,
                    lon: currentUser.lon,
                  }}
                  onProfileCard={profileCardHandler}
                  online={props.onlineUsers.some(
                    (e) => e.userId === user._id.toString()
                  )}
                />
              ))}
        </div>
      </div>
      <div
        className={classes.filtersBg}
        onClick={() => setFiltersMenu(false)}
        style={{
          opacity: filtersMenu ? 1 : 0,
          visibility: filtersMenu ? "visible" : "hidden",
        }}
      />
      <div
        className={classes.filtersMenu}
        style={{ width: filtersMenu ? "320px" : 0 }}
      >
        <Filters onChangeFilter={filtersHandler} />
      </div>
      {userProfile.display && currentUser && (
        <ProfileCard
          key={userProfile.profile._id}
          onCloseProfile={closeProfileHandler}
          user={userProfile.profile}
          token={authCtx.token}
          currentUser={currentUser}
          liked={currentUser.likes.includes(userProfile.profile._id)}
          currentLoc={{
            lat: currentUser.lat,
            lon: currentUser.lon,
          }}
          online={props.onlineUsers.some(
            (e) => e.userId === userProfile.profile._id.toString()
          )}
        />
      )}
    </>
  );
};

export default UsersPage;
