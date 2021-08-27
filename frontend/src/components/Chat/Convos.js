import classes from "./Convos.module.css";

const Convos = () => {
  return (
    <aside className={classes.convos}>
      <ul>
        {/* {props.users.map((usr) => {
          const imgProfile = usr.images.find((img) => img !== null);
          return (
            <Contact
              key={usr._id}
              imgProfile={imgProfile}
              username={usr.username}
            />
          );
        })} */}
      </ul>
    </aside>
  );
};

export default Convos;
