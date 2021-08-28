import { useContext, useEffect, useState } from "react";
import Room from "../components/Chat/Room";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import { getRoom, fetchMatches } from "../util/chatsReq";
import classes from "./Pages.module.css";

// const fetchMessages = async () => {};

const ChatPage = () => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const { sendReq, status, data, error } = useHttp(fetchMatches, true);
  const {
    sendReq: getRoomData,
    status: roomStatus,
    data: roomData,
  } = useHttp(getRoom, true);
  useEffect(() => {
    sendReq({ token: authCtx.token, path: "chat/matches" });
  }, [sendReq, authCtx.token]);
  if (status === "pending") {
    return <LoadingSpinner loadingScreen={true} />;
  }
  if (error) {
    return <p className={classes.error}>{error}</p>;
  }
  if (status === "completed" && (!data.matches || data.matches.length === 0)) {
    return <p className={classes.error}>No user found.</p>;
  }

  const loadRoomHandler = (id, user) => {
    getRoomData({ token: authCtx.token, path: `chat/room/${id}` });
    setUser(user);
  };
  return (
    <>
      <Room
        matches={data.matches}
        room={{ roomData, user }}
        status={roomStatus}
        onChangeRoom={loadRoomHandler}
      />
    </>
  );
};

export default ChatPage;
