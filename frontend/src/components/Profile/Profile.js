import AttractionForm from "./AttractionForm";
import BioForm from "./BioForm";
import GenderForm from "./GenderForm";
import ImagesForm from "./ImagesForm";
import classes from "./Profile.module.css";

const Profile = (props) => {
  return (
    <>
      <ImagesForm image={props.images} onChangeImg={props.onChangeImg} status={props.status} />
      <div>Username {props.user.username}</div>
      <div>email {props.user.email}</div>
      <div>Interests:</div>
      <GenderForm gender={props.user.gender} onChangeGender={props.onChangeGender} />
      <AttractionForm user={props.user} onChangeAttr={props.onChangeAttr} />
      <BioForm bio={props.user.bio} onChangeBio={props.onChangeBio} />
    </>
  );
};

export default Profile;
