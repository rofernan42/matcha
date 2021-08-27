const express = require("express");
const userController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/profile", isAuth, userController.getProfile);

router.put("/change-age", isAuth, userController.postAge);

router.put("/edit-settings", isAuth, userController.editSettings);

router.put("/change-gender", isAuth, userController.postGender);

router.put("/change-attraction", isAuth, userController.postAttraction);

router.put("/change-bio", isAuth, userController.postBio);

router.put("/add-interest", isAuth, userController.postInterest);

router.put("/remove-interest", isAuth, userController.removeInterest);

router.post("/post-image", isAuth, userController.postImage);

router.delete("/delete-image", isAuth, userController.deleteImage);

router.put("/send-like", isAuth, userController.postLike);

module.exports = router;
