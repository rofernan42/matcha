import ImagesForm from "./ImagesForm";
import SettingsForm from "./SettingsForm";
import classes from "./Profile.module.css";

const Settings = (props) => {
  return (
    <div className={classes.profilePage}>
      <div className={classes.settingsField}>
        <ImagesForm token={props.token} />
        <SettingsForm token={props.token} />
      </div>
    </div>
  );
};

export default Settings;
