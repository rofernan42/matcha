const express = require("express");
const notifsController = require("../controllers/notifications");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/notifications", isAuth, notifsController.getNotifications);

router.post("/create-notification", isAuth, notifsController.postNotification);

router.put("/notif-read", isAuth, notifsController.readNotification);

router.delete("/notifications/:id", isAuth, notifsController.deleteNotification);

router.delete("/notifications-all", isAuth, notifsController.deleteAllNotifications);

module.exports = router;
