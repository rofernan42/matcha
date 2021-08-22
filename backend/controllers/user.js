const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const { json } = require("express");

exports.getProfile = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }
  try {
    res.status(200).json(user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  const users = await User.fetchUsers();
  try {
    res.status(200).json(users);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postGender = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }
  user.gender = req.body.data;
  const updatedUser = new User({ ...user });
  await updatedUser.save();
  try {
    res.status(201).json(updatedUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postAttraction = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }
  const attr = req.body.data;
  user.attrMen = attr.men;
  user.attrWomen = attr.women;
  const updatedUser = new User({ ...user });
  await updatedUser.save();
  try {
    res.status(201).json(updatedUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postBio = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }
  user.bio = req.body.data;
  const updatedUser = new User({ ...user });
  await updatedUser.save();
  try {
    res.status(201).json(updatedUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postImage = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }
  const image = req.file;
  const userDir = `images/${user._id.toString()}`;
  const imageNb = +req.body.imageNb;
  if (!image) {
    const error = new Error("Please upload a file");
    error.statusCode = 422;
    throw error;
  }
  await fs.mkdir(userDir, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Directory created successfully");
  });
  const oldImageUrl = image.path.replace("\\", "/");
  const imageUrl = userDir + "/" + image.filename;
  fs.rename(oldImageUrl, imageUrl, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("File moved successfully");
    }
  });
  if (user.images[imageNb]) {
    clearImage(user.images[imageNb]);
  }
  user.images[imageNb] = imageUrl;
  const updatedUser = new User({ ...user });
  await updatedUser.save();
  try {
    res.status(201).json(updatedUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteImage = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }
  const imageNb = +req.body.imageNb;
  if (user.images[imageNb]) {
    clearImage(user.images[imageNb]);
  }
  user.images[imageNb] = null;
  const updatedUser = new User({ ...user });
  await updatedUser.save();
  try {
    res.status(201).json(updatedUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
