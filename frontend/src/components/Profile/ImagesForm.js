import { useEffect, useReducer, useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import Image from "./Image";
import classes from "./Profile.module.css";

const ImagesForm = (props) => {
  const [image, setImages] = useState([]);
  useEffect(() => {
      setImages(props.image)
  }, [props.image])
  return (
    <div className={classes["images-field"]}>
      <table>
        <tbody>
          <tr>
            <td rowSpan="2" className={classes["td-main"]}>
              {props.status === "pending" && (
                <LoadingSpinner loadingScreen={true} />
              )}
              {props.status === "completed" && (
                <Image
                  img={image[0]}
                  typeField="main"
                  imageNb={0}
                  onChangeImg={props.onChangeImg}
                />
              )}
            </td>
            <td className={classes["td-small"]}>
              <Image
                img={image[1]}
                typeField="small"
                imageNb={1}
                onChangeImg={props.onChangeImg}
              />
            </td>
            <td className={classes["td-small"]}>
              <Image
                img={image[2]}
                typeField="small"
                imageNb={2}
                onChangeImg={props.onChangeImg}
              />
            </td>
          </tr>
          <tr>
            <td className={classes["td-small"]}>
              <Image
                img={image[3]}
                typeField="small"
                imageNb={3}
                onChangeImg={props.onChangeImg}
              />
            </td>
            <td className={classes["td-small"]}>
              <Image
                img={image[4]}
                typeField="small"
                imageNb={4}
                onChangeImg={props.onChangeImg}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ImagesForm;
