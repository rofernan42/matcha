const Chatroom = require("../models/chatroom");

exports.getRoom = (req, res, next) => {};
exports.postRoom = (req, res, next) => {
    const room = await new Chatroom(userIds);
    room.save();
};
exports.postMessage = (req, res, next) => {};
exports.postMarkAsRead = (req, res, next) => {};
exports.deleteRoom = (req, res, next) => {};
