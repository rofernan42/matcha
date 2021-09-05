import { useEffect, useState } from "react";
import { updateImage, url } from "../../util/usersReq";
import classes from "./Images.module.css";

const Image = (props) => {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(props.img);
  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    if (file) {
      const updateImg = async () => {
        const newImgs = await updateImage({
          token: props.token,
          req: "POST",
          files: file,
          imageNb: props.imageNb,
          path: "post-image",
        });
        setImg(newImgs[props.imageNb]);
        setFile(null);
      };
      try {
        updateImg();
      } catch (err) {
        console.log(err.data || "Something went wrong.");
      }
    }
  }, [file, props]);
  const deleteImageHandler = async () => {
    try {
      await updateImage({
        token: props.token,
        req: "DELETE",
        imageNb: props.imageNb,
        path: "delete-image",
      });
      setImg(null);
    } catch (err) {
      console.log(err.data || "Something went wrong.");
    }
  };
  const inputName = "image" + props.imageNb;
  return (
    <>
      <div
        className={classes[`img-field-${props.typeField}`]}
        style={
          img
            ? {
                backgroundImage: `url(${url + img})`,
              }
            : {}
        }
      >
        {!img && (
          <label htmlFor={inputName}>
            <div className={classes["label-img"]}>
              <div
                className={`${classes.plus} ${classes[props.typeField]}`}
              ></div>
            </div>
          </label>
        )}
        {!img && (
          <input
            type="file"
            id={inputName}
            style={{ display: "none" }}
            name={inputName}
            onChange={fileChange}
          />
        )}
      </div>
      {img && (
        <button
          onClick={deleteImageHandler}
          className={`${classes.cross} ${classes[props.typeField]}`}
        >
          &times;
        </button>
      )}
    </>
  );
};
export default Image;
