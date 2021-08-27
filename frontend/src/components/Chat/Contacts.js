import Contact from "./Contact";
import classes from "./Room.module.css";

const Contacts = (props) => {
  return (
    <aside className={classes.contacts}>
      <header>
        <input type="text" placeholder="search" />
      </header>
      <ul>
        {props.users.map((usr) => {
          const imgProfile = usr.images.find((img) => img !== null);
          return (
            <Contact
              key={usr._id}
              imgProfile={imgProfile}
              username={usr.username}
            />
          );
        })}
      </ul>
    </aside>
  );
};

export default Contacts;
