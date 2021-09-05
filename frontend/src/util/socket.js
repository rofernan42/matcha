import io from "socket.io-client";
// const URL = "http://localhost:8000";
// const URL = "https://localhost:8000";
const URL = "http://192.168.1.44:8000";
const socket = io.connect(URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
});
export default socket;
