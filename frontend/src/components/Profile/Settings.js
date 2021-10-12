import ImagesForm from "./ImagesForm";
import SettingsForm from "./SettingsForm";
import classes from "./Profile.module.css";
import PreferencesForm from "./PreferencesForm";
import BioForm from "./BioForm";
import InterestsForm from "./InterestsForm";

const Settings = (props) => {
  return (
    <>
      <div className={classes.profilePage}>
        <div className={classes.settingsField}>
          <ImagesForm token={props.token} />
          <SettingsForm token={props.token} />
        </div>
      </div>
      <div className={classes.profilePage}>
        <div className={classes.settingsField}>
          <PreferencesForm
            user={props.user}
            onChangeUser={props.onChangeUser}
          />
          <BioForm bio={props.user.bio} onChangeBio={props.onChangeUser} />
          <InterestsForm
            interests={props.user.interests}
            onChangeInt={props.onChangeUser}
            token={props.token}
          />
        </div>
      </div>
    </>
  );
};

export default Settings;
