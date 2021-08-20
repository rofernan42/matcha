import classes from "./UserCard.module.css";

const UserCard = (props) => {
  const displayProfile = () => {
    props.onProfileCard(props.user);
  };
  return (
    <div className={classes.container} onClick={displayProfile}>
      <div className={classes["profile-card-2"]}>
        {/* <Avatar imgUrl="http://envato.jayasankarkr.in/code/profile/assets/img/profile-2.jpg" /> */}
        <img
          src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-2.jpg"
          className={`${classes.img} ${classes["img-responsive"]}`}
        />
        <div className={classes["profile-name"]}>{props.user.username}</div>
        <div className={classes["profile-username"]}>@johndoesurname</div>
        {/* <div className={classes["profile-icons"]}>
          <a href="#">
            <i className={classes["fa fa-facebook"]}></i>
          </a>
          <a href="#">
            <i className={classes["fa fa-twitter"]}></i>
          </a>
          <a href="#">
            <i className={classes["fa fa-linkedin"]}></i>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default UserCard;
