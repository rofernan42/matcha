import { useEffect, useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import Image from "./Image";
import classes from "./Images.module.css";

const ImagesForm = (props) => {
  const [image, setImages] = useState([]);
  useEffect(() => {
    setImages(props.image);
  }, [props.image]);
  return (
    <div className={classes["images-field"]}>
      <table>
        <tbody>
          <tr>
            <td rowSpan="2" className={classes["td-main"]}>
              {props.statusImg === "pending" && (
                <LoadingSpinner loadingScreen={true} />
              )}
              {(props.status === "completed" ||
                props.statusImg === "completed") && (
                <Image
                  key={image.image0}
                  img={image.image0}
                  typeField="main"
                  imageNb={0}
                  onChangeImg={props.onChangeImg}
                />
              )}
            </td>
            <td className={classes["td-small"]}>
              <Image
                key={image.image1}
                img={image.image1}
                typeField="small"
                imageNb={1}
                onChangeImg={props.onChangeImg}
              />
            </td>
            <td className={classes["td-small"]}>
              <Image
                key={image.image2}
                img={image.image2}
                typeField="small"
                imageNb={2}
                onChangeImg={props.onChangeImg}
              />
            </td>
          </tr>
          <tr>
            <td className={classes["td-small"]}>
              <Image
                key={image.image3}
                img={image.image3}
                typeField="small"
                imageNb={3}
                onChangeImg={props.onChangeImg}
              />
            </td>
            <td className={classes["td-small"]}>
              <Image
                key={image.image4}
                img={image.image4}
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
