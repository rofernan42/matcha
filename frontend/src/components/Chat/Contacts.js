import Contact from "./Contact";
import classes from "./Contacts.module.css";

const Contacts = (props) => {
  return (
    <div className={classes.contacts}>
      <div className={classes.wrapper}>
        <input
          type="text"
          placeholder="search"
          className={classes.searchInput}
        />
        {props.matches.map((match) => {
          const imgProfile = match.user.images.find((img) => img !== null);
          return (
            <Contact
              key={match.user._id}
              matchId={match.matchId}
              imgProfile={imgProfile}
              user={match.user}
              onChangeRoom={props.onChangeRoom}
              online={props.onlineUsers.some((e) => e.userId === match.user._id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Contacts;
