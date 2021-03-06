const express = require("express");
const actionsController = require("../controllers/actions");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.post("/send-like/:id", isAuth, actionsController.postLike);

router.delete("/cancel-match/:id", isAuth, actionsController.cancelMatch);

router.post("/block/:id", isAuth, actionsController.postBlock);

router.delete("/block/:id", isAuth, actionsController.destroyBlock);

router.post("/report/:id", isAuth, actionsController.postReport);

router.post("/visit/:id", isAuth, actionsController.visitProfile);

module.exports = router;
