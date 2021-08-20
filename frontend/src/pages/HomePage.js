import Home from "../components/Home/Home";
import OptionsOffline from "../components/Home/OptionsOffline";
import OptionsOnline from "../components/Home/OptionsOnline";

const HomePage = (props) => {
  return (
    <>
      <Home />
      {!props.isAuth && <OptionsOffline />}
      {props.isAuth && <OptionsOnline />}
    </>
  );
};

export default HomePage;
