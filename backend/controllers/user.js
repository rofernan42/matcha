const User = require("../models/user");

exports.getProfile = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 401;
        throw error;
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
