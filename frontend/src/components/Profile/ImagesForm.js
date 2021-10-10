import Image from "./Image";
import classes from "./Images.module.css";
import { useSelector } from "react-redux";

const ImagesForm = (props) => {
  const image = useSelector((state) => state.currentUser.data.images);

  return (
    <div className={classes["images-field"]}>
      <table>
        <tbody>
          <tr>
            <td rowSpan="2" className={classes["td-main"]}>
              <Image
                key={image[0]}
                img={image[0]}
                typeField="main"
                imageNb={0}
                token={props.token}
              />
            </td>
            <td className={classes["td-small"]}>
              <Image
                key={image[1]}
                img={image[1]}
                typeField="small"
                imageNb={1}
                token={props.token}
              />
            </td>
            <td className={classes["td-small"]}>
              <Image
                key={image[2]}
                img={image[2]}
                typeField="small"
                imageNb={2}
                token={props.token}
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
                token={props.token}
              />
            </td>
            <td className={classes["td-small"]}>
              <Image
                key={image[4]}
                img={image[4]}
                typeField="small"
                imageNb={4}
                token={props.token}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ImagesForm;
