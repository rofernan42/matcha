import { useState } from "react";
import classes from "../UserProfile/UserProfile.module.css";
import { useSelector } from "react-redux";
import ImageSlider from "../Users/ImageSlider";
import OwnInfo from "./OwnInfo";

const OwnProfile = () => {
  const currentUser = useSelector((state) => state.currentUser.data);
  const [imgSlider, setImgSlider] = useState(false);
  const images = currentUser.images.filter((img) => img);

  return (
    <div style={{ marginLeft: "65px" }}>
      {currentUser && (
        <div className={classes.userProfile}>
          <OwnInfo
            onSetImgSlider={() => setImgSlider(true)}
            currentUser={currentUser}
            images={images}
          />
          {imgSlider && (
            <div>
              <div
                className={classes.background}
                onClick={() => setImgSlider(false)}
              />
              <div className={classes.imageSlider}>
                <ImageSlider
                  images={images}
                  width={"600px"}
                  height={"400px"}
                  btnSize={"80px"}
                  overflowX={"visible"}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnProfile;
