import { useState } from "react";
import classes from "./ImageSlider.module.css";
import { url } from "../../util/usersReq";

const ImageSlider = (props) => {
  const [properties, setProperties] = useState({
    images: props.images,
    currentImage: props.images[0],
    index: 0,
  });
  const nextImage = () => {
    let newIndex;
    if (properties.index < props.images.length - 1) {
      newIndex = properties.index + 1;
    } else {
      newIndex = properties.index;
    }
    setProperties(() => {
      return {
        images: props.images,
        currentImage: props.images[newIndex],
        index: newIndex,
      };
    });
  };
  const prevImage = () => {
    let newIndex;
    if (properties.index > 0) {
      newIndex = properties.index - 1;
    } else {
      newIndex = properties.index;
    }
    setProperties(() => {
      return {
        images: props.images,
        currentImage: props.images[newIndex],
        index: newIndex,
      };
    });
  };
  return (
    <>
      {properties.index > 0 && (
        <button
          className={`${classes["btn-slider"]} ${classes.prev}`}
          onClick={prevImage}
        >
          {"<"}
        </button>
      )}
      {properties.index < properties.images.length - 1 && (
        <button
          className={`${classes["btn-slider"]} ${classes.next}`}
          onClick={nextImage}
        >
          {">"}
        </button>
      )}
      <div
        className={`${classes["images-slider"]} ${
          classes[`active-slide-${properties.index}`]
        }`}
      >
        <div
          className={classes["images-slider-wrapper"]}
          style={{
            transform: `translateX(-${
              properties.index * (100 / properties.images.length)
            }%)`,
          }}
        >
          {properties.images.map((img) => {
            const imgIndex = properties.images.indexOf(img);
            return (
              <div key={img} className={classes["card-content"]}>
                <img
                  id={classes[`card-image-${imgIndex}`]}
                  className={classes["card-image"]}
                  alt=""
                  src={`${url}${img}`}
                  style={{
                    opacity: `${imgIndex === properties.index ? "1" : "0.3"}`,
                  }}
                  onClick={() => {
                    window.open(`${url}${img}`, "_blank").focus();
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
