import { useState } from "react";
import { url } from "../../util/utils";
import classes from "./ImageSlider.module.css";

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
        <button className={`${classes.arrow} ${classes.left}`} onClick={prevImage}>
          <svg
            width={props.btnSize}
            height={props.btnSize}
            viewBox="0 0 50 80"
            xmlSpace="preserve"
          >
            <polyline
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="45.63,75.8 0.375,38.087 45.63,0.375 "
            />
          </svg>
        </button>
      )}
      {properties.index < properties.images.length - 1 && (
        <button className={`${classes.arrow} ${classes.right}`} onClick={nextImage}>
          <svg
            width={props.btnSize}
            height={props.btnSize}
            viewBox="0 0 50 80"
            xmlSpace="preserve"
          >
            <polyline
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0.375,0.375 45.63,38.087 0.375,75.8 "
            />
          </svg>
        </button>
      )}
      <div
        className={`${classes["images-slider"]} ${
          classes[`active-slide-${properties.index}`]
        }`}
        style={{ width: `${props.width}`, height: `${props.height}`, overflowX: `${props.overflowX}` }}
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
              <div
                key={img}
                className={classes["card-content"]}
                style={{ width: `${props.width}` }}
              >
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
      {/* </div> */}
    </>
  );
};

export default ImageSlider;
