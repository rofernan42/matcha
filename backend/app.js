const express = require("express");
const db = require("./util/database");
// const mongoConnect = require("./util/database").mongoConnect;
const multer = require("multer");
const path = require("path");
// const fs = require("fs");
// const https = require("https");

// const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const usersRoutes = require("./routes/users");
const chatroomRoutes = require("./routes/chatroom");

const app = express();

// db.execute("SELECT * FROM users");

// const privateKey = fs.readFileSync("server.key");
// const certificate = fs.readFileSync("server.cert");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const dateStr = new Date().toISOString().replace(/:/g, "-");
    cb(null, dateStr + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json({ limit: "50mb" }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow every domains
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// app.use(cors({
//   'allowedHeaders': ['Content-Type'], // headers that React is sending to the API
//   'exposedHeaders': ['Content-Type'], // headers that you are sending back to React
//   'origin': '*',
//   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   'preflightContinue': false
// }));

app.use("/auth", authRoutes);
app.use(userRoutes);
app.use(usersRoutes);
app.use("/chat", chatroomRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.error;
  res.status(status).json({ message: message });
});

// mongoConnect((client) => {
// const server = https.createServer({key: privateKey, cert: certificate}, app).listen(8000);
const server = app.listen(8000, "192.168.1.44");
const io = require("./socket").init(server);
let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId == userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId != socketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId == userId);
};
io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  socket.on("sendMessage", ({ senderId, receiverId, text, roomId }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
        fromRoom: roomId,
      });
    }
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
  socket.on("logout", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
// });
