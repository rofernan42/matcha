const express = require("express");
const userController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/profile", isAuth, userController.getProfile);

router.get("/users", isAuth, userController.getUsers);

router.post("/change-gender", isAuth, userController.postGender);

module.exports = router;