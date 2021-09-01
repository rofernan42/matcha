const db = require("../util/database");

class Message {
  constructor(data) {
    this._id = data._id;
    this.user_id = data.user_id;
    this.match_id = data.match_id;
    this.content = data.content;
    this.created_at = Date.now();
  }

  save() {
    return db.execute(
      "INSERT INTO messages (user_id, match_id, content, created_at) VALUES (?, ?, ?, ?)",
      [this.user_id, this.match_id, this.content, this.created_at]
    );
  }

  static async findByMatch(matchId) {
    const res = await db.execute("SELECT * FROM messages WHERE match_id=?", [
      matchId,
    ]);
    return res[0];
  }
}

module.exports = Message;
