import Nav from "./Nav";

const Layout = (props) => {
  return (
    <>
      <Nav />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
