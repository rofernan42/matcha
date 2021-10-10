import AgeForm from "./AgeForm";
import GenderForm from "./GenderForm";
import AttractionForm from "./AttractionForm";
import classes from "./SettingsForm.module.css";

const PreferencesForm = (props) => {
  return (
    <div className={classes["edit-settings"]}>
      <div className={classes.header}>
        <div className={classes.headerLabel}>Other information</div>
      </div>
      <AgeForm age={props.user.age} onChangeAge={props.onChangeUser} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <GenderForm
          gender={props.user.gender}
          onChangeGender={props.onChangeUser}
        />
        <AttractionForm user={props.user} onChangeAttr={props.onChangeUser} />
      </div>
    </div>
  );
};

export default PreferencesForm;
