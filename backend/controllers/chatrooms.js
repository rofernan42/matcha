const { ObjectId } = require("mongodb");
const Chatroom = require("../models/chatroom");
const Match = require("../models/match");
const User = require("../models/user");

const io = require("../socket");

exports.getMatches = async (req, res, next) => {
  const matches = await Match.fetchMatches(req.userId);
  const usersMatched = matches.map((users) => {
    if (users.user1.toString() === req.userId) {
      return { user: users.user2, id: users._id };
    }
    return { user: users.user1, id: users._id };
  });
  const resMatches = await Promise.all(
    usersMatched.map(async (elem) => {
      const user = await User.findById(elem.user);
      return { user, matchId: elem.id };
    })
  );
  try {
    res.status(200).json({ matches: resMatches });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getRoom = async (req, res, next) => {
  const id = req.params.id;
  const match = await Match.findById(id);
  try {
    res.status(200).json(match);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// exports.postRoom = async (req, res, next) => {
//   const room = await new Chatroom(userIds);
//   room.save();
// };

exports.postMessage = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }
  const room = await Match.findById(req.params.id);
  if (req.body.content.length > 0) {
    const id = new ObjectId();
    const newMsg = {
      creator: user._id,
      content: req.body.content,
      _id: id,
      created_at: id.getTimestamp(),
    };
    room.messages.push(newMsg);
  }
  //   console.log(room.messages[0]._id.getTimestamp());
  const updatedRoom = new Match({ ...room });
  await updatedRoom.save();
  try {
    res.status(200).json(updatedRoom);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.postMarkAsRead = (req, res, next) => {};
exports.deleteRoom = (req, res, next) => {};
