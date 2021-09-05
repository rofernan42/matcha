const express = require("express");
const chatroomController = require("../controllers/chatrooms");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/matches", isAuth, chatroomController.getMatches);

router.get("/room/:id", isAuth, chatroomController.getRoom);

router.post("/room/:id/message", isAuth, chatroomController.postMessage);

router.post("/room/:id/mark-read", isAuth, chatroomController.markAsRead);

module.exports = router;
