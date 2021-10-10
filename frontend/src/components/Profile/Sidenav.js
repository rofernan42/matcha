import "./Sidenav.css";
import settings from "../../images/settings.png";
import profil from "../../images/profil.png";
import heart from "../../images/heart.png";
import block from "../../images/block.png";
import { Link, useLocation } from "react-router-dom";

const Sidenav = (props) => {
  const loc = useLocation();
  return (
    <>
      <div className="container">
        <div className="nav__cont">
          <div className="nav">
            <div className={`nav__items ${loc.hash === "" ? "active" : ""}`}>
              <img alt="" src={settings} />
              <Link to="#">Settings</Link>
            </div>
          </div>
          <div className="nav">
            <div
              className={`nav__items ${
                loc.hash === "#options" ? "active" : ""
              }`}
            >
              <img alt="" src={profil} />
              <Link to={`/users/${props.userId}`}>See profile</Link>
            </div>
          </div>
          <div className="nav">
            <div
              className={`nav__items ${loc.hash === "#likes" ? "active" : ""}`}
            >
              <img alt="" src={heart} />
              <Link to="#likes">Likes</Link>
            </div>
          </div>
          <div className="nav">
            <div
              className={`nav__items ${loc.hash === "#blocks" ? "active" : ""}`}
            >
              <img alt="" src={block} />
              <Link to="#blocks">Users blocked</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
