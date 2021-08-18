const express = require("express");
const userController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/profile", isAuth, userController.getProfile);

module.exports = router;