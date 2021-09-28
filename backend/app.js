exports.DOMAIN = "192.168.1.14";
const express = require("express");
const multer = require("multer");
const path = require("path");
// const fs = require("fs");
// const https = require("https");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const usersRoutes = require("./routes/users");
const chatroomRoutes = require("./routes/chatroom");
const actionsRoutes = require("./routes/actions");
const notifsRoutes = require("./routes/notifications");

const app = express();

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

app.use("/auth", authRoutes);
app.use(userRoutes);
app.use(usersRoutes);
app.use("/chat", chatroomRoutes);
app.use(actionsRoutes);
app.use(notifsRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.error;
  res.status(status).json({ message: message });
});

// const server = https.createServer({key: privateKey, cert: certificate}, app).listen(8000);
const server = app.listen(8000, this.DOMAIN);
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
      io.to(user.socketId).emit(`getMessageConvo${roomId}`, {
        roomId,
        text,
      });
      io.to(user.socketId).emit(`getChatNotif`);
    }
  });
  socket.on("newMatch", (data) => {
    if (data) {
      const user = getUser(data.userId);
      if (user) {
        io.to(user.socketId).emit("notifMatch", {
          message: `You matched with ${data.username} !`,
        });
        io.to(user.socketId).emit("getPushNotif");
      }
    }
  });
  socket.on("cancelMatch", (data) => {
    if (data) {
      const user = getUser(data.userId);
      if (user) {
        io.to(user.socketId).emit("getPushNotif");
      }
    }
  })
  socket.on("newLike", (data) => {
    if (data) {
      const user = getUser(data.userId);
      if (user) {
        io.to(user.socketId).emit("getPushNotif");
      }
    }
  });
  socket.on("newVisit", (data) => {
    if (data) {
      const user = getUser(data.userId);
      if (user) {
        io.to(user.socketId).emit("getPushNotif");
      }
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
