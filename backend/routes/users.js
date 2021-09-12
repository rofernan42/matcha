const express = require("express");
const usersController = require("../controllers/users");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/all-users", isAuth, usersController.getUsers);

router.get("/blocked-users", isAuth, usersController.getBlockedUsers);

router.get("/liked-users", isAuth, usersController.getLikedUsers);

router.get("/users-liking", isAuth, usersController.getUsersWhoLikeMe);

router.get("/filtered-users", isAuth, usersController.getFilteredUsers);

module.exports = router;
