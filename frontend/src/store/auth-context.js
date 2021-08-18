import React from "react";
import { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isAuth: false,
  login: (token) => {},
  logout: () => {},
});

const retrieveToken = () => {
  const storedToken = localStorage.getItem("token");
  return { token: storedToken };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const loggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const contextValue = {
    token: token,
    isAuth: loggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
