const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Chatroom {
  constructor(userId1, userId2, id) {
    this.userIds = [userId1, userId2];
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    return db
      .collection("chatrooms")
      .insertOne(this, { createdOn: new Date() });
  }
}

module.exports = Chatroom;
