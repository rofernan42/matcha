import "./Sidenav.css";
import settings from "../../images/settings.png";
import profil from "../../images/profil.png";
import heart from "../../images/heart.png";
import notif from "../../images/notification-empty.png";
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
                loc.hash === "#interactions" ? "active" : ""
              }`}
            >
              <img alt="" src={heart} />
              <Link to="#interactions">Interactions</Link>
            </div>
          </div>
          <div className="nav">
            <div
              className={`nav__items ${loc.hash === "#notifs" ? "active" : ""}`}
            >
              <img alt="" src={notif} />
              <Link to="#notifs">Notifications</Link>
            </div>
          </div>
          <div className="nav">
            <div
              className={`nav__items ${
                loc.hash === "#options" ? "active" : ""
              }`}
            >
              <img alt="" src={profil} />
              <Link to="#perso">See profile</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
