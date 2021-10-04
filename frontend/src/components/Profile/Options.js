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
        <h1>Profile options</h1>
        <AgeForm age={props.user.age} onChangeAge={props.onChangeUser} />
        <div style={{ display: "flex" }}>
          <GenderForm
            gender={props.user.gender}
            onChangeGender={props.onChangeUser}
          />
          <AttractionForm user={props.user} onChangeAttr={props.onChangeUser} />
        </div>
        <BioForm bio={props.user.bio} onChangeBio={props.onChangeUser} />
        <InterestsForm
          interests={props.user.interests.split(";")}
          onChangeInt={props.onChangeUser}
          token={props.token}
        />
      </div>
    </div>
  );
};

export default Options;
