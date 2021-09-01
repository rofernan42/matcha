const db = require("../util/database");

class Match {
  constructor(data) {
    this._id = data._id;
    this.user1 = data.user1;
    this.user2 = data.user2;
    this.lastMessage = data.lastMessage;
  }

  save() {
    if (this._id) {
      return db.query(
        "REPLACE INTO matches (_id, user1, user2, lastMessage) VALUES (?, ?, ?, ?);",
        [this._id, this.user1, this.user2, this.lastMessage]
      );
    } else {
      return db.execute("INSERT INTO matches (user1, user2) VALUES (?, ?)", [
        this.user1,
        this.user2,
      ]);
    }
  }

  static destroy(user1, user2) {
    const db = getDb();
    return db.collection("matches").deleteOne({
      $or: [
        { user1: mongodb.ObjectId(user1), user2: mongodb.ObjectId(user2) },
        { user1: mongodb.ObjectId(user2), user2: mongodb.ObjectId(user1) },
      ],
    });
  }

  static async findById(id) {
    const [res] = await db.execute("SELECT * FROM matches WHERE _id=?", [id]);
    return res[0];
  }

  static async findByUsers(user1, user2) {
    const [res] = await db.execute(
      "SELECT * FROM matches WHERE (user1=? AND user2=?) OR (user1=? AND user2=?)",
      [user1, user2, user2, user1]
    );
    return res[0];
  }

  static async fetchMatches(userId) {
    // const db = getDb();
    // return db
    //   .collection("matches")
    //   .find({
    //     $or: [
    //       { user1: mongodb.ObjectId(userId) },
    //       { user2: mongodb.ObjectId(userId) },
    //     ],
    //   })
    //   .toArray();
    const res = await db.execute(
      "SELECT * FROM matches WHERE user1=? OR user2=?",
      [userId, userId]
    );
    return res[0];
  }
}

module.exports = Match;
