const express = require("express");
const userController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/profile", isAuth, userController.getProfile);

router.get("/users", isAuth, userController.getUsers);

router.post("/change-gender", isAuth, userController.postGender);

router.post("/change-attraction", isAuth, userController.postAttraction);

router.post("/change-bio", isAuth, userController.postBio);

router.post("/add-interest", isAuth, userController.postInterest);

router.post("/remove-interest", isAuth, userController.removeInterest);

router.post("/post-image", isAuth, userController.postImage);

router.delete("/delete-image", isAuth, userController.deleteImage);

router.post("/post-like/:id", isAuth, userController.postLike);

module.exports = router;