const express = require("express");
const chatroomController = require("../controllers/chatrooms");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/matches", isAuth, chatroomController.getMatches);

router.get("/room/:id", isAuth, chatroomController.getRoom);
// router.post("/create-room", chatroomController.postRoom);
router.post("/room/:id/message", isAuth, chatroomController.postMessage);
// router.post("/:id/mark-read", chatroomController.postMarkAsRead);
// router.delete("/:id", chatroomController.deleteRoom);

module.exports = router;
