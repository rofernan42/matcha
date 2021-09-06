const User = require("../models/user");
const Image = require("../models/image");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authValidation = require("../middleware/auth-validation");

exports.signup = async (req, res, next) => {
  const username = req.body.username.trim();
  const name = req.body.name.trim();
  const lastname = req.body.lastname.trim();
  const email = req.body.email.trim();
  const password = req.body.password;
  const errors = await authValidation(
    username,
    name,
    lastname,
    email,
    password
  );
  try {
    if (Object.keys(errors).length > 0) {
      const error = new Error("Something went wrong");
      error.error = errors;
      error.statusCode = 422;
      throw error;
    }
    const lat = req.body.lat;
    const lon = req.body.lon;
    const hashedPwd = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      name,
      lastname,
      email,
      password: hashedPwd,
      lat,
      lon,
    });
    await user.save();
    const createdUser = await User.findByEmail(user.email);
    const userImgs = new Image({
      user_id: createdUser._id
    })
    await userImgs.save();
    console.log(user);
    res.status(201).json({ userId: createdUser._id, message: "User created" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findByEmail(email);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      error.error = "Wrong password";
      throw error;
    }
    const loadedUser = new User({ ...user, lat: req.body.lat, lon: req.body.lon });
    await loadedUser.save();
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      "matchasecrettoken",
      { expiresIn: "24h" }
    );
    res
      .status(200)
      .json({ token, userId: loadedUser._id.toString(), expiresIn: 86400 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
