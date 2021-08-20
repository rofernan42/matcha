const User = require("../models/user");

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

exports.updateUser = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }
  const gender = req.body.gender;
  const attrMen = req.body.attrMen;
  const attrWomen = req.body.attrWomen;
  const bio = req.body.bio || "";
  const interests = req.body.interests || "";
  let sexOr = "bisexual";
  if (
    (attrMen && gender === "female") ||
    (attrWomen && gender === "male")
  ) {
    sexOr = "heterosexual";
  } else if (
    (attrMen && gender === "male") ||
    (attrWomen && gender === "female")
  ) {
    sexOr = "homosexual";
  }
  
};
