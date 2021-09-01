const db = require("../util/database");

class Image {
  constructor(data) {
    this._id = data._id;
    this.user_id = data.user_id;
    this.image0 = data.image0 || null;
    this.image1 = data.image1 || null;
    this.image2 = data.image2 || null;
    this.image3 = data.image3 || null;
    this.image4 = data.image4 || null;
  }

  save() {
    if (this._id) {
      const values = Object.values(this);
      return db.query(
        "REPLACE INTO images (_id, user_id, image0, image1, image2, image3, image4) VALUES (?, ?, ?, ?, ?, ?, ?);",
        [...values]
      );
    } else {
      return db.execute("INSERT INTO images (user_id) VALUES (?)", [
        this.user_id,
      ]);
    }
  }

  static async findByUser(id) {
    const [res] = await db.execute("SELECT * FROM images WHERE user_id=?", [
      id,
    ]);
    if (!res) {
      return db.execute("INSERT INTO images (user_id) VALUES (?)", [id]);
    }
    return res[0];
  }
}

module.exports = Image;
