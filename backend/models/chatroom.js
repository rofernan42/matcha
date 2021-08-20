const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Chatroom {
  constructor(userIds, id) {
    this.userIds = [userIds];
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
