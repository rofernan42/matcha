const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(username, name, lastname, email, password, id) {
    this.username = username;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this._id = id;
    const gender = "other";
    const sexOr = "bisexual";
    const bio = "";
    const interests = "";
    const images = [];
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db
        .collection("users")
        .updateOne({ _id: this._id }, { $set: this });
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

  setGender;
}

module.exports = User;
