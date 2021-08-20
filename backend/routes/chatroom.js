const express = require("express");
const chatroomController = require("../controllers/chatrooms");
const router = express.Router();

router.get("/:id", chatroomController.getRoom);
router.post("/create-room", chatroomController.postRoom);
router.post("/:id/message", chatroomController.postMessage);
router.post("/:id/mark-read", chatroomController.postMarkAsRead);
router.delete("/:id", chatroomController.deleteRoom);

module.exports = router;
