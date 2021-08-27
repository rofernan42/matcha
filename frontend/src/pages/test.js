import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import UserCard from "../components/Users/UserCard";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import { fetchCurrentUser, fetchUsers } from "../util/usersReq";
import classes from "../components/Users/UserCard.module.css";
import ProfileCard from "../components/Users/ProfileCard";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import Test from "./UsersPage";

const UsersPage = () => {

  return (
    <>
      <Pagination lastPage={3} >
        <Test />
      </Pagination>
    </>
  );
};

export default UsersPage;
