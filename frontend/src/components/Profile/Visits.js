import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { url } from "../../util/utils";
import classes from "./Interactions.module.css";
import profil from "../../images/blank-profile-picture.jpg";
import { fetchUsers } from "../../util/usersReq";

const Visits = (props) => {
  const [visits, setVisits] = useState(null);

  useEffect(() => {
    try {
      const fetchVisits = async () => {
        const fetchedVisits = await fetchUsers({
          token: props.token,
          path: "visits",
        });
        setVisits(fetchedVisits.users.reverse());
      };
      fetchVisits();
    } catch (err) {
      console.log(err);
    }
  }, [props.token]);

  return (
    <div className={classes.visits}>
      <div className={classes.visitsTitle}>They visited your profile...</div>
      <div>
        {(!visits || visits.length === 0) && (
          <div className={classes.noVisit}>
            No one has visited your profile for now.
          </div>
        )}
        {visits &&
          visits.map((visit) => {
            return (
              <Link
                to={`/users/${visit._id}`}
                key={visit._id}
                className={classes.visitOption}
              >
                {visit.image && <img alt="" src={url + visit.image} />}
                {!visit.image && <img alt="" src={profil} />}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Visits;
