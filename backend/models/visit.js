const db = require("../util/database");

class Visit {
  constructor(data) {
    this._id = data._id;
    this.id_from = data.id_from;
    this.id_towards = data.id_towards;
  }

  save() {
    return db.execute("INSERT INTO visits (id_from, id_towards) VALUES (?, ?)", [
      this.id_from,
      this.id_towards,
    ]);
  }

  static async destroy(id) {
    return db.execute("DELETE FROM visits WHERE _id=?", [id]);
  }

  static async destroyByUsers(user1, user2) {
    return db.execute(
      "DELETE FROM visits WHERE (id_from=? AND id_towards=?) OR (id_from=? AND id_towards=?)",
      [user1, user2, user2, user1]
    );
  }

  static async findByUsers(from, towards) {
    const [res] = await db.execute(
      "SELECT * FROM visits WHERE id_from=? AND id_towards=?",
      [from, towards]
    );
    return res[0];
  }

  static async fetchVisits(id) {
    const res = await db.execute(
      "SELECT id_towards FROM visits WHERE id_from=?",
      [id]
    );
    return res[0].map((vst) => vst.id_towards);
  }

  static async fetchVisitsTowards(id) {
    const res = await db.execute(
      "SELECT id_from FROM visits WHERE id_towards=?",
      [id]
    );
    return res[0].map((vst) => vst.id_from);
  }
}

module.exports = Visit;
