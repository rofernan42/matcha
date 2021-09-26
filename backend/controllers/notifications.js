const Notification = require("../models/notification");
const User = require("../models/user");

exports.getNotifications = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const notifs = await Notification.fetchByUser(req.userId);
    res.status(200).json(notifs);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postNotification = async (req, res, next) => {
  const notifType = req.body.type;
  const fromName = req.body.fromName;
  const user_id = req.body.userId;
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    let notifContent;
    if (notifType === "visit")
      notifContent = fromName + " visited your profile!";
    else if (notifType === "like") notifContent = fromName + " just liked you!";
    else if (notifType === "match")
      notifContent = "You matched with " + fromName + "!";
    else if (notifType === "cancel")
      notifContent = fromName + " cancelled the match :(";
    const notif = new Notification({
      user_id,
      notifType,
      notifContent,
    });
    await notif.save();
    res.status(201).json({ message: "Notification created" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.readNotification = async (req, res, next) => {};

exports.deleteNotification = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Notification.destroy(id);
    const notifs = await Notification.fetchByUser(req.userId);
    res.status(201).json(notifs);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteAllNotifications = async (req, res, next) => {
  try {
    await Notification.destroyAll(req.userId);
    res.status(201).json([]);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
