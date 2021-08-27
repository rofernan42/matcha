import AgeForm from "./AgeForm";
import AttractionForm from "./AttractionForm";
import BioForm from "./BioForm";
import GenderForm from "./GenderForm";
import ImagesForm from "./ImagesForm";
import InterestsForm from "./InterestsForm";
import SettingsForm from "./SettingsForm";
import classes from "./Profile.module.css";

const Profile = (props) => {
  return (
    <div className={classes.profilePage}>
      <ImagesForm image={props.images} onChangeImg={props.onChangeImg} status={props.status} statusImg={props.statusImg} />
      <SettingsForm user={props.user} onChangeSettings={props.onChangeUser} error={props.error} />
      <AgeForm age={props.user.age} onChangeAge={props.onChangeUser} />
      <GenderForm gender={props.user.gender} onChangeGender={props.onChangeUser} />
      <AttractionForm user={props.user} onChangeAttr={props.onChangeUser} />
      <BioForm bio={props.user.bio} onChangeBio={props.onChangeUser} />
      <InterestsForm interests={props.user.interests} onChangeInt={props.onChangeUser} />
    </div>
  );
};

export default Profile;
