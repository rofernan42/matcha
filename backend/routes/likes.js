const express = require("express");
const likesController = require("../controllers/likes");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.post("/send-like", isAuth, likesController.postLike);

module.exports = router;
