const db = require("../util/database");

class Block {
  constructor(data) {
    this._id = data._id;
    this.id_from = data.id_from;
    this.id_towards = data.id_towards;
  }

  save() {
    return db.execute(
      "INSERT INTO blocks (id_from, id_towards) VALUES (?, ?)",
      [this.id_from, this.id_towards]
    );
  }

  static async destroy(id) {
    return db.execute("DELETE FROM blocks WHERE _id=?", [id]);
  }

  static async destroyByUsers(from, towards) {
    const [res] = await db.execute(
      "DELETE FROM blocks WHERE id_from=? AND id_towards=?",
      [from, towards]
    );
    return res[0];
  }

  static async fetchByUser(userId) {
    const res = await db.execute(
      "SELECT * FROM blocks WHERE id_from=? OR id_towards=?",
      [userId, userId]
    );
    return res[0];
  }

  static async fetchByBlockFrom(userId) {
    const res = await db.execute(
      "SELECT id_towards FROM blocks WHERE id_from=?",
      [userId]
    );
    return res[0].map((obj) => obj.id_towards);
  }

  static async findByUsers(from, towards) {
    const res = await db.execute(
      "SELECT * FROM blocks WHERE (id_from=? AND id_towards=?) OR (id_from=? AND id_towards=?)",
      [from, towards, towards, from]
    );
    return res[0];
  }

  // static async findByUsers(from, towards) {
  //   const [res] = await db.execute(
  //     "SELECT * FROM likes WHERE id_from=? AND id_towards=?",
  //     [from, towards]
  //   );
  //   return res[0];
  // }

  // static async fetchLikes(id) {
  //   const res = await db.execute(
  //     "SELECT id_towards FROM likes WHERE id_from=?",
  //     [id]
  //   );
  //   return res[0].map((lk) => lk.id_towards);
  // }
}

module.exports = Block;
