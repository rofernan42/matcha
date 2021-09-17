const User = require("../models/user");
const Image = require("../models/image");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authValidation = require("../middleware/auth-validation");
const crypto = require("crypto");
const DOMAIN = require("../app").DOMAIN;
const nodemailer = require("nodemailer");
const emailPassword = require("../../credentials").emailPassword;

const transporter = nodemailer.createTransport({
  // name: "gmail.com",
  // host: "smtp.gmail.com",
  // port: 587,
  // secure: false,
  service: "Gmail",
  auth: {
    user: "matcha.rofernan@gmail.com",
    pass: emailPassword,
  },
});

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
      user_id: createdUser._id,
    });
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
    const loadedUser = new User({
      ...user,
      lat: req.body.lat,
      lon: req.body.lon,
    });
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

exports.reset = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findByEmail(email);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const buf = crypto.randomBytes(32);
    const token = buf.toString("hex");
    const updatedUser = new User({
      ...user,
      resetToken: token,
      resetTokenExpiry: Date.now() + 3600000,
    });
    await updatedUser.save();
    const mailOptions = {
      from: "matcha.rofernan@gmail.com",
      to: "romain.fndz42@gmail.com",
      subject: "Reset your password",
      html: `
        <h1>You requested a password reset</h1>
        <p>Click this <a href="http://${DOMAIN}:3000/reset-password/${token}">link</a> to set a new password.</p>
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

exports.setPassword = async (req, res, next) => {
  const token = req.params.token.toString();
  const user = await User.findByToken(token);
  try {
    if (!user) {
      const error = new Error("User not found or token expired");
      error.statusCode = 404;
      error.error = "Token expired. Please make another reset request.";
      throw error;
    }
    const password = req.body.password;
    const repPassword = req.body.repPassword;
    if (password !== repPassword) {
      const error = new Error("Passwords must be the same");
      error.statusCode = 422;
      error.error = "Passwords must be the same in each field.";
      throw error;
    }
    if (password.length < 6) {
      const error = new Error("Invalid password");
      error.statusCode = 422;
      error.error = "Invalid password (minimum 6 characters).";
      throw error;
    }
    const hashedPwd = await bcrypt.hash(password, 12);
    const updatedUser = new User({ ...user, password: hashedPwd });
    await updatedUser.save();
    res.status(200).json({ message: "Password changed" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
