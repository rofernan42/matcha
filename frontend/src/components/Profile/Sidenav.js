import "./Sidenav.css";
import settings from "../../images/settings.png";
import profil from "../../images/profil.png";
import heart from "../../images/heart.png";
import block from "../../images/block.png";

const Sidenav = (props) => {
  return (
    <>
      <div className="container">
        <div className="nav__cont">
          <div className="nav">
            <div className="nav__items ">
              <img alt="" src={settings} />
              <div onClick={() => props.onChangePage("SETTINGS")}>Settings</div>
            </div>
          </div>
          <div className="nav">
            <div className="nav__items ">
              <img alt="" src={profil} />
              <div onClick={() => props.onChangePage("OPTIONS")}>Options</div>
            </div>
          </div>
          <div className="nav">
            <div className="nav__items ">
              <img alt="" src={heart} />
              <div onClick={() => props.onChangePage("LIKES")}>Likes</div>
            </div>
          </div>
          <div className="nav">
            <div className="nav__items ">
              <img alt="" src={block} />
              <div onClick={() => props.onChangePage("BLOCKED")}>Users blocked</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
