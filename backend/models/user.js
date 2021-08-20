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
    this.gender = data.gender || "other";
    this.attraction = data.attraction || "both"
    this.bio = data.bio || "";
    this.interests = data.interests || "";
    this.images = data.images || [];
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

  updateData(data) {
    this.gender = data;
    const db = getDb();
    return db.collection("users").updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
  }
}

module.exports = User;
