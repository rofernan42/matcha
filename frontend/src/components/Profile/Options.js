import AgeForm from "./AgeForm";
import AttractionForm from "./AttractionForm";
import BioForm from "./BioForm";
import GenderForm from "./GenderForm";
import InterestsForm from "./InterestsForm";
import classes from "./Profile.module.css";

const Options = (props) => {
  return (
    <div className={classes.profilePage}>
      <div className={classes.settingsField}>
        <AgeForm age={props.user.age} onChangeAge={props.onChangeUser} />
        <GenderForm
          gender={props.user.gender}
          onChangeGender={props.onChangeUser}
        />
        <AttractionForm user={props.user} onChangeAttr={props.onChangeUser} />
        <BioForm bio={props.user.bio} onChangeBio={props.onChangeUser} />
        <InterestsForm
          interests={props.user.interests.split(";")}
          onChangeInt={props.onChangeUser}
          token={props.token}
        />
        <div>People who have seen your profile</div>
        <div>People who liked you</div>
      </div>
    </div>
  );
};

export default Options;