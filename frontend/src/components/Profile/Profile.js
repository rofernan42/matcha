import AttractionForm from "./AttractionForm";
import BioForm from "./BioForm";
import GenderForm from "./GenderForm";
import ImagesForm from "./ImagesForm";
import InterestsForm from "./InterestsForm";

const Profile = (props) => {
  return (
    <>
      <ImagesForm image={props.images} onChangeImg={props.onChangeImg} status={props.status} statusImg={props.statusImg} />
      <div>Username {props.user.username}</div>
      <div>email {props.user.email}</div>
      <GenderForm gender={props.user.gender} onChangeGender={props.onChangeUser} />
      <AttractionForm user={props.user} onChangeAttr={props.onChangeUser} />
      <BioForm bio={props.user.bio} onChangeBio={props.onChangeUser} />
      <InterestsForm interests={props.user.interests} onChangeInt={props.onChangeUser} />
    </>
  );
};

export default Profile;
