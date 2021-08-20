import classes from "./Profile.module.css"

const Profile = (props) => {
  return (
    <>
    <div className={classes["images-field"]}>
        images:
    </div>
      <div>Username {props.user.username}</div>
      <div>email {props.user.email}</div>
      <div>I am a : man woman</div>
      <div>I am attracted to: men women</div>
      <div>Bio:</div>
      <div>Interests:</div>
    </>
  );
};

export default Profile;
