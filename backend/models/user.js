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
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findById(id) {
    const db = getDb();
    return db.collection("users").find({ _id: new mongodb.ObjectId(id) }).next();
  }
  static findByEmail(email) {
    const db = getDb();
    return db.collection("users").findOne({ email: email });
  }
  static findByUsername(username) {
    const db = getDb();
    return db.collection("users").findOne({ username: username });
  }
}

module.exports = User;
