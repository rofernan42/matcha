import Nav from "./Nav";
import { useState } from "react";

const Layout = (props) => {
  const [userOptions, setUserOptions] = useState(false);
  const [notifs, setNotifs] = useState(false);
  const userToggleOptions = () => {
    setUserOptions((prev) => !prev);
  };
  const notifsToggleOptions = () => {
    setNotifs((prev) => !prev);
  };
  return (
    <>
      <div
        onClick={() => {
          userOptions && setUserOptions(false);
          notifs &&
            setNotifs(() => {
              return false;
            });
        }}
      >
        <Nav
          dropdowns={{ userOptions, notifs }}
          onToggle={{ userToggleOptions, notifsToggleOptions }}
        />
        <main>{props.children}</main>
      </div>
    </>
  );
};

export default Layout;
