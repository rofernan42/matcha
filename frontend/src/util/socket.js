import io from "socket.io-client";
// const URL = "http://localhost:8000";
const URL = "http://192.168.1.44:8000";
const socket = io(URL, { autoConnect: true });
export default socket;