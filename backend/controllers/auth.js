const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authValidation = require("../middleware/auth-validation");

exports.signup = (req, res, next) => {
  const username = req.body.username.trim();
  const name = req.body.name.trim();
  const lastname = req.body.lastname.trim();
  const email = req.body.email.trim();
  const password = req.body.password;
  authValidation(username, name, lastname, email, password)
    .then((errors) => {
      if (Object.keys(errors).length > 0) {
        const error = new Error("Something went wrong");
        error.error = errors;
        error.statusCode = 422;
        throw error;
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashedPwd) => {
      const user = new User({
        username,
        name,
        lastname,
        email,
        password: hashedPwd,
      });
      return user.save();
    })
    .then((user) => {
      console.log(user);
      res.status(201).json({ message: "User created" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  const user = await User.findByEmail(email);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  loadedUser = user;
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    const error = new Error("Wrong password");
    error.statusCode = 401;
    throw error;
  }
  try {
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      "matchasecrettoken",
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ token, userId: loadedUser._id.toString(), expiresIn: 3600 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
