const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/reset-password", authController.reset);

router.post("/new-password/:token", authController.setPassword);

module.exports = router;
