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
                  key={image[0]}
                  img={image[0]}
                  typeField="main"
                  imageNb={0}
                  onChangeImg={props.onChangeImg}
                />
              )}
            </td>
            <td className={classes["td-small"]}>
              <Image
                key={image[1]}
                img={image[1]}
                typeField="small"
                imageNb={1}
                onChangeImg={props.onChangeImg}
              />
            </td>
            <td className={classes["td-small"]}>
              <Image
                key={image[2]}
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
                key={image[3]}
                img={image[3]}
                typeField="small"
                imageNb={3}
                onChangeImg={props.onChangeImg}
              />
            </td>
            <td className={classes["td-small"]}>
              <Image
                key={image[4]}
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
