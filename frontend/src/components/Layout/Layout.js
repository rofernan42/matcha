import Nav from "./Nav";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const Layout = (props) => {
  return (
    <>
      <ReactNotification />
      <Nav />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
