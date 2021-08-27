const express = require("express");
const usersController = require("../controllers/users");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/all-users", isAuth, usersController.getUsers);

router.get("/filtered-users", isAuth, usersController.getFilteredUsers);

router.get("/all-matches", isAuth, usersController.getMatches);

module.exports = router;
