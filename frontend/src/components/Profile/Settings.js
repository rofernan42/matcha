import ImagesForm from "./ImagesForm";
import SettingsForm from "./SettingsForm";
import classes from "./Profile.module.css";

const Settings = (props) => {
  return (
    <div className={classes.profilePage}>
      <div className={classes.settingsField}>
        <ImagesForm
          image={props.images}
          onChangeImg={props.onChangeImg}
          status={props.status}
          statusImg={props.statusImg}
          token={props.token}
        />
        <SettingsForm
          user={props.user}
          onChangeSettings={props.onChangeUser}
          error={props.error}
          token={props.token}
        />
      </div>
    </div>
  );
};

export default Settings;
