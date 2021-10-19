const db = require("../util/database");
const Block = require("./block");
const Like = require("./like");
const Match = require("./match");
const Visit = require("./visit");

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
    this.resetToken = data.resetToken || null;
    this.resetTokenExpiry = data.resetTokenExpiry || null;
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
        "REPLACE INTO users (_id, username, name, lastname, email, password, age, gender, attrMen, attrWomen, bio, interests, score, lat, lon, lastConnection, resetToken, resetTokenExpiry, image0, image1, image2, image3, image4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [...values]
      );
    } else {
      return db.execute(
        "INSERT INTO users (username, name, lastname, email, password, age, gender, attrMen, attrWomen, bio, interests, score, lat, lon, lastConnection, resetToken, resetTokenExpiry, image0, image1, image2, image3, image4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          this.username,
          this.name,
          this.lastname,
          this.email,
          this.password,
          this.age,
          this.gender,
          this.attrMen,
          this.attrWomen,
          this.bio,
          this.interests,
          this.score,
          this.lat,
          this.lon,
          this.lastConnection,
          this.resetToken,
          this.resetTokenExpiry,
          this.image0,
          this.image1,
          this.image2,
          this.image3,
          this.image4,
        ]
      );
    }
  }

  static async findById(id) {
    const [user] = await db.execute("SELECT * FROM users WHERE _id=?", [id]);
    if (user.length === 0) return null;
    const extractedImages = [
      user[0].image0,
      user[0].image1,
      user[0].image2,
      user[0].image3,
      user[0].image4,
    ];
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
  static async findByToken(token) {
    const date = Date.now();
    const [res] = await db.execute(
      "SELECT * FROM users WHERE resetToken=? AND resetTokenExpiry>?",
      [token, date]
    );
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
    const queryUsers =
      "SELECT _id,username,image0,image1,image2,image3,image4 FROM users WHERE _id IN (" +
      blockings.join() +
      ")";
    const res = await db.execute(queryUsers);
    const data = res[0].map((user) => {
      return {
        _id: user._id,
        username: user.username,
        image: [
          user.image0,
          user.image1,
          user.image2,
          user.image3,
          user.image4,
        ].find((img) => img),
      };
    });
    return data;
  }

  static async fetchLikedUsers(userId) {
    const likes = await Like.fetchLikes(userId);
    if (likes.length === 0) {
      return [];
    }
    const queryUsers =
      "SELECT _id,username,image0,image1,image2,image3,image4 FROM users WHERE _id IN (" +
      likes.join() +
      ")";
    const res = await db.execute(queryUsers);
    const data = res[0].map((user) => {
      return {
        _id: user._id,
        username: user.username,
        image: [
          user.image0,
          user.image1,
          user.image2,
          user.image3,
          user.image4,
        ].find((img) => img),
      };
    });
    return data;
  }

  static async fetchUsersWhoLikeMe(userId) {
    const likes = await Like.fetchLikesTowards(userId);
    if (likes.length === 0) {
      return [];
    }
    const queryUsers =
      "SELECT _id,username,image0,image1,image2,image3,image4 FROM users WHERE _id IN (" +
      likes.join() +
      ")";
    const res = await db.execute(queryUsers);
    const data = res[0].map((user) => {
      return {
        _id: user._id,
        username: user.username,
        image: [
          user.image0,
          user.image1,
          user.image2,
          user.image3,
          user.image4,
        ].find((img) => img),
      };
    });
    return data;
  }

  static async fetchVisits(userId) {
    const visits = await Visit.fetchVisitsTowards(userId);
    if (visits.length === 0) {
      return [];
    }
    const data = await Promise.all(
      visits.map(async (user) => {
        const [img] = await db.execute(
          "SELECT image0,image1,image2,image3,image4 FROM users WHERE _id=?",
          [user]
        );
        return {
          _id: user,
          image: Object.values(img[0]).find((img) => img),
        };
      })
    );
    return data;
  }

  static async fetchFilteredUsers(currentUserId) {
    const res = await db.execute("SELECT * FROM users WHERE _id!=?", [
      currentUserId,
    ]);
    const data = await Promise.all(
      res[0].map(async (user) => {
        const likesMe = await Like.findByUsers(user._id, currentUserId);
        const matchedMe = await Match.findByUsers(user._id, currentUserId);
        const extractedImages = [
          user.image0,
          user.image1,
          user.image2,
          user.image3,
          user.image4,
        ];
        return {
          ...user,
          images: extractedImages,
          likesMe: likesMe ? true : false,
          matchedMe: matchedMe ? true : false,
        };
      })
    );
    return data;
  }
}

module.exports = User;
