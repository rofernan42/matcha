const User = require("../models/user");

module.exports = async (username, name, lastname, email, password, currentUser) => {
  let errors = {};
  userName = await User.findByUsername(username);
  userEmail = await User.findByEmail(email);
  if (username.length === 0) {
    errors = { ...errors, errusername: "Username must not be empty" };
  }
  if (userName && userName._id.toString() !== currentUser) {
    errors = { ...errors, errusername: "Username already taken" };
  }
  if (name.length === 0) {
    errors = { ...errors, errname: "Name must not be empty" };
  }
  if (lastname.length === 0) {
    errors = { ...errors, errlastname: "Last name must not be empty" };
  }
  if (email.length === 0 || !email.includes("@")) {
    errors = { ...errors, erremail: "Bad email input" };
  }
  if (userEmail && userEmail._id.toString() !== currentUser) {
    errors = { ...errors, erremail: "User already exists" };
  }
  if (password !== null && password.length < 6) {
    errors = { ...errors, errpassword: "Password is too short (min 6 characters)" };
  }
  return errors;
};
