const db = require("../util/database");

class Notification {
  constructor(data) {
    this._id = data._id;
    this.user_id = data.user_id;
    this.notifType = data.notifType || "";
    this.notifContent = data.notifContent || "";
    this.notifRead = data.notifRead || false;
    this.created_at = Date.now();
  }

  save() {
    return db.execute(
      "INSERT INTO notifications (user_id, notifType, notifContent, notifRead, created_at) VALUES (?, ?, ?, ?, ?)",
      [
        this.user_id,
        this.notifType,
        this.notifContent,
        this.notifRead,
        this.created_at,
      ]
    );
  }

  static async destroyAll(userId) {
    return db.execute("DELETE FROM notifications WHERE user_id=?", [userId]);
  }

  static async destroy(id) {
    return db.execute("DELETE FROM notifications WHERE _id=?", [id]);
  }

  static async setNotifsRead(userId) {
    return db.query("UPDATE notifications SET notifRead=? WHERE user_id=?;", [
      true,
      userId,
    ]);
  }

  static async fetchByUser(userId) {
    const res = await db.execute(
      "SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC",
      [userId]
    );
    return res[0];
  }
}

module.exports = Notification;
