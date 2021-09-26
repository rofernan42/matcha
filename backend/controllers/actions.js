const User = require("../models/user");
const Like = require("../models/like");
const Visit = require("../models/visit");
const Match = require("../models/match");
const Block = require("../models/block");
const DOMAIN = require("../app").DOMAIN;
const transporter = require("./auth").transporter;

exports.postLike = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const towardsId = req.params.id;
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

exports.cancelMatch = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const towardsId = req.params.id;
    await Like.destroyByUsers(user._id, towardsId);
    await Match.destroy(user._id, towardsId);
    res.status(201).json({ message: "match cancelled" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postBlock = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const towardsId = req.params.id;
    await Like.destroyByUsers(user._id, towardsId);
    await Match.destroy(user._id, towardsId);
    const newBlock = new Block({ id_from: user._id, id_towards: towardsId });
    await newBlock.save();
    res.status(201).json({ message: "user blocked" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.destroyBlock = async (req, res, next) => {
  try {
    await Block.destroyByUsers(req.userId, req.params.id);
    const blockedUsers = await User.fetchBlockedUsers(req.userId);
    res.status(201).json({ users: blockedUsers });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postReport = async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  try {
    const mailOptions = {
      from: "matcha.rofernan@gmail.com",
      to: "matcha.rofernan@gmail.com",
      subject: "A user has been reported",
      html: `
        <h1>User id: ${userId} has been reported.</h1>
        <p>Click this <a href="http://${DOMAIN}:3000/users/${userId}">link</a> to visit the user's profile page.</p>
        <p>User info - id: ${userId} - email: ${user.email} - username: ${user.username} - name: ${user.name} - last name: ${user.lastname}</p>
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw error;
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ message: "Email sent" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.visitProfile = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const towardsId = req.params.id;
    const towardsUser = await User.findById(towardsId);
    const existingVisit = await Visit.findByUsers(user._id, towardsId);
    if (towardsUser && !existingVisit) {
      const visit = new Visit({ id_from: user._id, id_towards: towardsId });
      await visit.save();
    }
    res.status(201).json({ message: "You visited a profile" });
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
