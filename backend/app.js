const express = require("express");
const mongoConnect = require("./util/database").mongoConnect;
const multer = require("multer");
const path = require("path");
// const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const usersRoutes = require("./routes/users");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'images')
  },
  filename: (req, file, cb) => {
      const dateStr = new Date().toISOString().replace(/:/g, '-')
      cb(null, dateStr + '-' + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
  } else {
      cb(null, false);
  }
};

app.use(express.json({limit: '50mb'}));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
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

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.error;
  res.status(status).json({ message: message });
});



mongoConnect((client) => {
  const server = app.listen(8000);
  const io = require("./socket").init(server);
  // io.use((req, next) => {
  //   req.u
  // })
  io.on("connection", (socket) => {
    // console.log(socket.id)
    // const users = [];
    // users.push({ id: socket.id })
    // console.log(users)
    // socket.on("test", data => {
    //   console.log(data.userId + " " + socket.id);
    //   socket.set("user", {userId: data.userId, socketId: socket.id})
    // })
    // const lala = socket.get("user");
    // console.log(lala)
    // socket.broadcast.emit("connected", { message: "connected"})
  })
});
