const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Match {
  constructor(user1, user2) {
    this.user1 = new mongodb.ObjectId(user1);
    this.user2 = new mongodb.ObjectId(user2);
  }

  save() {
    const db = getDb();
    return db.collection("matches").insertOne(this);
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

  static findByUsers(user1, user2) {
    const db = getDb();
    return db.collection("matches").findOne({
      $or: [
        { user1: mongodb.ObjectId(user1), user2: mongodb.ObjectId(user2) },
        { user1: mongodb.ObjectId(user2), user2: mongodb.ObjectId(user1) },
      ],
    });
  }

  static fetchMatches(userId) {
    const db = getDb();
    return db.collection("matches").find({
      $or: [
        { user1: mongodb.ObjectId(userId) },
        { user2: mongodb.ObjectId(userId) },
      ],
    }).toArray();
  }
}

module.exports = Match;
