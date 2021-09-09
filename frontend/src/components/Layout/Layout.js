import Nav from "./Nav";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useState } from "react";

const Layout = (props) => {
  const [userOptions, setUserOptions] = useState(false);
  const toggleOptions = () => {
    setUserOptions((prev) => !prev);
  }
  return (
    <>
      <div onClick={() => userOptions && setUserOptions(false)}>
        <ReactNotification />
        <Nav
          currentUserOptions={userOptions}
          onSetUserOptions={toggleOptions}
        />
        <main>{props.children}</main>
      </div>
    </>
  );
};

export default Layout;
