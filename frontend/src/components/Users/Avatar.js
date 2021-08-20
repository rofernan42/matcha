import classes from "./UserCard.module.css";

const Avatar = (props) => (
  <div
    className={`${classes.img} ${classes["img-responsive"]}`}
    style={{
      backgroundImage: `url('${props.imageUrl}')`,
      backgroundSize: props.contain ? "contain" : "cover",
      backgroundPosition: props.left ? "left" : "center",
    }}
  />
);

export default Avatar;
