import { useEffect, useState } from "react";
import { url } from "../../util/usersReq";
import classes from "./Images.module.css";

const Image = (props) => {
  const [file, setFile] = useState(null);
  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    if (file) {
      props.onChangeImg({
        req: "POST",
        files: file,
        imageNb: props.imageNb,
        path: "post-image",
      });
      setFile(null);
    }
  }, [file, props]);
  const deleteImageHandler = () => {
    props.onChangeImg({
      req: "DELETE",
      imageNb: props.imageNb,
      path: "delete-image",
    });
  };
  const inputName = "image" + props.imageNb;
  return (
    <>
      <div
        className={classes[`img-field-${props.typeField}`]}
        style={
          props.img
            ? {
                backgroundImage: `url(${url + props.img})`,
              }
            : {}
        }
      >
        {!props.img && (
          <label htmlFor={inputName}>
            <div className={classes["label-img"]}>
              <div
                className={`${classes.plus} ${classes[props.typeField]}`}
              ></div>
            </div>
          </label>
        )}
        {!props.img && (
          <input
            type="file"
            id={inputName}
            style={{ display: "none" }}
            name={inputName}
            onChange={fileChange}
          />
        )}
      </div>
      {props.img && (
        <button
          onClick={deleteImageHandler}
          className={`${classes.cross} ${classes[props.typeField]}`}
        ></button>
      )}
    </>
  );
};
export default Image;
