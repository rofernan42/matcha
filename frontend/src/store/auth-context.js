import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import socket from "../util/socket";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  userId: "",
  isAuth: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveAuthData = () => {
  const storedToken = localStorage.getItem("token");
  const storedUserId = localStorage.getItem("userId");
  const storedDate = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingTime(storedDate);
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return { token: storedToken, userId: storedUserId, duration: remainingTime };
};

export const AuthContextProvider = (props) => {
  const data = retrieveAuthData();
  let initialToken;
  let initialUserId;
  if (data && data.token) {
    initialToken = data.token;
    initialUserId = data.userId;
  }
  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);
  const loggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationTime");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    socket.emit("logout");
  }, []);

  const loginHandler = async (token, userId, expirationTime) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (data && data.token) {
      logoutTimer = setTimeout(logoutHandler, data.duration);
    }
  }, [data, logoutHandler]);
  const contextValue = {
    token: token,
    userId: userId,
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
