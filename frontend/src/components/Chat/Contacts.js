import { useEffect, useState } from "react";
import Contact from "./Contact";
import classes from "./Contacts.module.css";

const Contacts = (props) => {
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState(props.matches);
  useEffect(() => {
    setMatches(
      props.matches.filter((match) => match.user.username.includes(search))
    );
  }, [search, props.matches]);
  return (
    <div className={classes.contacts}>
      <div className={classes.wrapper}>
        <input
          type="text"
          placeholder="search"
          className={classes.searchInput}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        {props.matches &&
          matches.map((match) => {
            return (
              <Contact
                key={match.user._id}
                matchId={match.match._id}
                imgProfile={match.user.image}
                user={match.user}
                onChangeRoom={props.onChangeRoom}
                online={props.onlineUsers.some(
                  (e) => e.userId === match.user._id.toString()
                )}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Contacts;
