const User = require("../models/user");
const Like = require("../models/like");
const Match = require("../models/match");

exports.postLike = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const towardsId = req.body.data;
    const match = await createMatch(user._id, towardsId);
    const existingLike = await Like.findByUsers(user._id, towardsId);
    if (!existingLike) {
      const newLike = new Like({ id_from: user._id, id_towards: towardsId });
      await newLike.save();
    } else {
      await Like.destroy(existingLike._id);
    }
    const likes = await Like.fetchLikes(user._id);
    res.status(201).json({ likes, match, currentUser: user.username });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const createMatch = async (user1, user2) => {
  const mutualLike = await Like.findByUsers(user2, user1);
  if (mutualLike) {
    const existingMatch = await Match.findByUsers(user1, user2);
    if (!existingMatch) {
      const newMatch = new Match({ user1, user2 });
      await newMatch.save();
      return newMatch;
    }
  }
  return null;
};
