import BioForm from "./BioForm";
import InterestsForm from "./InterestsForm";
import PreferencesForm from "./PreferencesForm";
import classes from "./Profile.module.css";

const Options = (props) => {
  return (
    <div className={classes.profilePage}>
      <div className={classes.settingsField}>
        <PreferencesForm user={props.user} onChangeUser={props.onChangeUser} />
        <BioForm bio={props.user.bio} onChangeBio={props.onChangeUser} />
        <InterestsForm
          interests={props.user.interests}
          onChangeInt={props.onChangeUser}
          token={props.token}
        />
      </div>
    </div>
  );
};

export default Options;
