const Profile = (props) => {
  return (
    <>
      <div>Username {props.user.username}</div>
      <div>email {props.user.email}</div>
    </>
  );
};

export default Profile;
