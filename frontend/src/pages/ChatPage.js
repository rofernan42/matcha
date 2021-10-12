import { useCallback, useContext, useEffect, useState } from "react";
import Room from "../components/Chat/Room";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import { getRoom, fetchMatches } from "../util/chatsReq";
import { userAction } from "../store/currentUser-actions";
import { useDispatch } from "react-redux";

const ChatPage = (props) => {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState(null);
  const {
    sendReq: getRoomData,
    status: roomStatus,
    data: roomData,
  } = useHttp(getRoom, true);

  const getMatches = useCallback(async () => {
    const data = await fetchMatches({
      token: authCtx.token,
      path: "chat/matches",
    });
    setMatches(data.matches);
  }, [authCtx.token]);

  useEffect(() => {
    getMatches();
  }, [getMatches]);

  const loadRoomHandler = (id, user) => {
    updateConvos(id);
    getRoomData({ token: authCtx.token, path: `chat/room/${id}` });
    setUser(user);
  };
  const updateConvos = async (roomId) => {
    const updatedMatch = await dispatch(
      userAction({
        path: `chat/room/${roomId}/mark-read`,
        method: "POST",
        token: authCtx.token,
      })
    );
    setMatches((prev) =>
      prev.map((match) => {
        return {
          user: match.user,
          match:
            match.match._id === updatedMatch.match._id
              ? updatedMatch.match
              : match.match,
        };
      })
    );
  };
  return (
    <>
      {matches && (
        <Room
          matches={matches}
          room={{ roomData, user }}
          status={roomStatus}
          onChangeRoom={loadRoomHandler}
          onlineUsers={props.onlineUsers}
          onUpdateConvos={updateConvos}
          authCtx={authCtx}
          onGetMatches={getMatches}
        />
      )}
    </>
  );
};

export default ChatPage;
