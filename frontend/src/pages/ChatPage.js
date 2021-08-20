import { useContext, useEffect } from "react";
import Room from "../components/Chat/Room";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import { fetchUsers } from "../util/usersReq";

const fetchMessages = async () => {};

const ChatPage = () => {
  const authCtx = useContext(AuthContext);
  const { sendReq, status, data: users, error } = useHttp(fetchUsers, true);
  useEffect(() => {
    sendReq(authCtx.token);
  }, [sendReq, authCtx.token]);

  if (status === "pending") {
    return <LoadingSpinner loadingScreen={true} />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (status === "completed" && (!users || users.length === 0)) {
    return <p>No user found.</p>;
  }
  return (
    <>
      <Room users={users} />
    </>
  );
};

export default ChatPage;
