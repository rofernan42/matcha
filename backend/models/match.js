const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Match {
  constructor(data) {
    this.user1 = new mongodb.ObjectId(data.user1);
    this.user2 = new mongodb.ObjectId(data.user2);
    this._id = data._id;
    this.messages = data.messages || [];
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db
        .collection("matches")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      return db.collection("matches").insertOne(this);
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

  static findById(id) {
    const db = getDb();
    return db
      .collection("matches")
      .find({ _id: new mongodb.ObjectId(id) })
      .next();
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
    return db
      .collection("matches")
      .find({
        $or: [
          { user1: mongodb.ObjectId(userId) },
          { user2: mongodb.ObjectId(userId) },
        ],
      })
      .toArray();
  }
}

module.exports = Match;
