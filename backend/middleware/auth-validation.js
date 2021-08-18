const User = require("../models/user");

module.exports = async (username, name, lastname, email, password) => {
  let errors = {};
  userName = await User.findByUsername(username);
  userEmail = await User.findByEmail(email);
  if (username.length === 0) {
    errors = { ...errors, errusername: "Username must not be empty" };
  }
  if (userName) {
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
  if (userEmail) {
    errors = { ...errors, erremail: "User already exists" };
  }
  if (password.length < 6) {
    errors = { ...errors, errpassword: "Password is too short" };
  }
  return errors;
};
