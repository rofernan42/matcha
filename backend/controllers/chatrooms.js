const Match = require("../models/match");
const User = require("../models/user");
const Message = require("../models/message");

exports.getMatches = async (req, res, next) => {
  const matches = await Match.fetchMatches(req.userId);
  try {
    if (!matches) {
      const error = new Error("Matches not found");
      error.statusCode = 404;
      throw error;
    }
    const usersMatched = matches.map((match) => {
      if (match.user1 === req.userId) {
        return {
          user: match.user2,
          match,
        };
      }
      return { user: match.user1, match };
    });
    const resMatches = await Promise.all(
      usersMatched.map(async (elem) => {
        const user = await User.findById(elem.user);
        return {
          user: { _id: user._id, username: user.username, image: user.images.find(img => img != null) },
          match: elem.match,
        };
      })
    );
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
    if (!match) {
      const error = new Error("Match not found");
      error.statusCode = 404;
      throw error;
    }
    const messages = await Message.findByMatch(match._id);
    res.status(200).json({ match, messages });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postMessage = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const room = await Match.findById(req.params.id);
    if (!room) {
      const error = new Error("Match not found");
      error.statusCode = 404;
      throw error;
    }
    if (req.body.content.length > 0) {
      const newMsg = new Message({
        user_id: user._id,
        match_id: room._id,
        content: req.body.content,
      });
      await newMsg.save();
      room.lastMessage = req.body.content;
      room.msgRead = false;
      room.msgAuthor = user._id;
    }
    const updatedRoom = new Match({ ...room });
    await updatedRoom.save();
    const messages = await Message.findByMatch(room._id);
    res.status(200).json({ match: updatedRoom, messages });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.markAsRead = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const room = await Match.findById(req.params.id);
    if (user._id !== room.msgAuthor) {
      room.msgRead = true;
    }
    const updatedRoom = new Match({ ...room });
    await updatedRoom.save();
    res.status(200).json({ match: updatedRoom });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
