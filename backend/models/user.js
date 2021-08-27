const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(data) {
    this.username = data.username;
    this.name = data.name;
    this.lastname = data.lastname;
    this.email = data.email;
    this.password = data.password;
    this._id = data._id;
    this.age = data.age || null;
    this.gender = data.gender || "other";
    this.attrMen = data.attrMen === null ? true : data.attrMen;
    this.attrWomen = data.attrWomen === null ? true : data.attrWomen;
    this.bio = data.bio || "";
    this.interests = data.interests || [];
    this.images = data.images || [null, null, null, null, null];
    this.likes = data.likes || [];
    this.score = data.score || 0.0;
    this.lastConnection = Date.now();
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db
        .collection("users")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      return db.collection("users").insertOne(this);
    }
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(id) })
      .next();
  }
  static findByEmail(email) {
    const db = getDb();
    return db.collection("users").findOne({ email: email });
  }
  static findByUsername(username) {
    const db = getDb();
    return db.collection("users").findOne({ username: username });
  }

  static fetchUsers() {
    const db = getDb();
    return db
      .collection("users")
      .find()
      .toArray()
      .then((users) => {
        return users;
      });
  }
  static async fetchFilteredUsers(currentUserId) {
    const db = getDb();
    const users = await db.collection("users").find().toArray();
    return users.filter((users) => users._id.toString() !== currentUserId);
  }
}

module.exports = User;
