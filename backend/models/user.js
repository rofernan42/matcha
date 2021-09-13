const db = require("../util/database");
const Block = require("./block");
const Like = require("./like");

class User {
  constructor(data) {
    this._id = data._id;
    this.username = data.username;
    this.name = data.name;
    this.lastname = data.lastname;
    this.email = data.email;
    this.password = data.password;
    this.age = data.age || null;
    this.gender = data.gender || "other";
    this.attrMen =
      data.attrMen === null || data.attrMen === undefined ? true : data.attrMen;
    this.attrWomen =
      data.attrWomen === null || data.attrWomen === undefined
        ? true
        : data.attrWomen;
    this.bio = data.bio || "";
    this.interests = data.interests || "";
    this.score = data.score || 0.0;
    this.lat = data.lat || null;
    this.lon = data.lon || null;
    this.lastConnection = Date.now();
  }

  save() {
    if (this._id) {
      const values = Object.values(this);
      return db.query(
        "REPLACE INTO users (_id, username, name, lastname, email, password, age, gender, attrMen, attrWomen, bio, interests, score, lat, lon, lastConnection) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [...values]
      );
    } else {
      return db.execute(
        "INSERT INTO users (username, name, lastname, email, password, gender, attrMen, attrWomen, lat, lon) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          this.username,
          this.name,
          this.lastname,
          this.email,
          this.password,
          this.gender,
          this.attrMen,
          this.attrWomen,
          this.lat,
          this.lon,
        ]
      );
    }
  }

  static async findById(id) {
    const [user] = await db.execute("SELECT * FROM users WHERE _id=?", [id]);
    if (user.length === 0) return null;
    const [images] = await db.execute(
      "SELECT image0,image1,image2,image3,image4 FROM images WHERE user_id=?",
      [id]
    );
    const extractedImages = Object.values(images[0]);
    return { ...user[0], images: extractedImages };
  }
  static async findByEmail(email) {
    const [res] = await db.execute("SELECT * FROM users WHERE email=?", [
      email,
    ]);
    return res[0];
  }
  static async findByUsername(username) {
    const [res] = await db.execute("SELECT * FROM users WHERE username=?", [
      username,
    ]);
    return res[0];
  }

  static async fetchUsers() {
    const res = await db.execute("SELECT * FROM users");
    return res;
  }

  static async fetchBlockedUsers(userId) {
    const blockings = await Block.fetchByBlockFrom(userId);
    if (blockings.length === 0) {
      return [];
    }
    const query = "SELECT * from users WHERE _id IN (" + blockings.join() + ")";
    const res = await db.execute(query);
    return res[0];
  }

  static async fetchLikedUsers(userId) {
    const likes = await Like.fetchLikes(userId);
    if (likes.length === 0) {
      return [];
    }
    const query = "SELECT * from users WHERE _id IN (" + likes.join() + ")";
    const res = await db.execute(query);
    return res[0];
  }

  static async fetchUsersWhoLikeMe(userId) {
    const likes = await Like.fetchLikesTowards(userId);
    if (likes.length === 0) {
      return [];
    }
    const query = "SELECT * from users WHERE _id IN (" + likes.join() + ")";
    const res = await db.execute(query);
    return res[0];
  }

  static async fetchFilteredUsers(currentUserId) {
    const res = await db.execute("SELECT * FROM users WHERE _id!=?", [
      currentUserId,
    ]);
    const [images] = await db.execute("SELECT * FROM images WHERE user_id!=?", [
      currentUserId,
    ]);
    const data = await Promise.all(
      res[0].map(async (user) => {
        const likesMe = await Like.findByUsers(user._id, currentUserId);
        const imgs = images.find((img) => img.user_id === user._id);
        const extractedImages = Object.values(
          (({ image0, image1, image2, image3, image4 }) => ({
            image0,
            image1,
            image2,
            image3,
            image4,
          }))(imgs)
        );
        return {
          ...user,
          images: extractedImages,
          likesMe: likesMe ? true : false,
        };
      })
    );
    return data;
  }
}

module.exports = User;
