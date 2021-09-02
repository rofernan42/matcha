const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Connected");
  conn.query("CREATE DATABASE IF NOT EXISTS matcha", (err, res) => {
    if (err) throw err;
    console.log("Database created");
  });
  conn.query(
    `
    CREATE TABLE IF NOT EXISTS matcha.users (
      _id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      username VARCHAR(45) NOT NULL,
      name VARCHAR(45) NOT NULL,
      lastname VARCHAR(45) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      age INT NULL,
      gender VARCHAR(45) NULL,
      attrMen TINYINT NULL,
      attrWomen TINYINT NULL,
      bio VARCHAR(255) NULL,
      interests VARCHAR(255) NULL,
      score DECIMAL(1) NULL,
      lastConnection BIGINT NULL,
      PRIMARY KEY (_id),
      UNIQUE INDEX _id_UNIQUE (_id ASC) VISIBLE,
      UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE,
      UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE);
    `,
    (err, res) => {
      if (err) throw err;
      console.log("Table users created");
    }
  );
  conn.query(
    `
    CREATE TABLE IF NOT EXISTS matcha.images (
      _id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      user_id INT UNSIGNED NOT NULL,
      image0 TEXT NULL,
      image1 TEXT NULL,
      image2 TEXT NULL,
      image3 TEXT NULL,
      image4 TEXT NULL,
      PRIMARY KEY (_id),
      UNIQUE INDEX _id_UNIQUE (_id ASC) VISIBLE,
      UNIQUE INDEX user_id_UNIQUE (user_id ASC) VISIBLE);
    `,
    (err, res) => {
      if (err) throw err;
      console.log("Table images created");
    }
  );
  conn.query(
    `
    CREATE TABLE IF NOT EXISTS matcha.matches (
      _id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      user1 INT NOT NULL,
      user2 INT NOT NULL,
      lastMessage VARCHAR(255) NULL,
      PRIMARY KEY (_id),
      UNIQUE INDEX _id_UNIQUE (_id ASC) VISIBLE);
    `,
    (err, res) => {
      if (err) throw err;
      console.log("Table matches created");
    }
  );
  conn.query(
    `
    CREATE TABLE IF NOT EXISTS matcha.messages (
      _id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      user_id INT UNSIGNED NOT NULL,
      match_id INT UNSIGNED NOT NULL,
      content VARCHAR(255) NOT NULL,
      created_at BIGINT NOT NULL,
      PRIMARY KEY (_id),
      UNIQUE INDEX _id_UNIQUE (_id ASC) VISIBLE,
      CONSTRAINT match_id
        FOREIGN KEY (match_id)
        REFERENCES matcha.matches (_id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION);
    `,
    (err, res) => {
      if (err) throw err;
      console.log("Table messages created");
    }
  );
  conn.query(
    `
    CREATE TABLE IF NOT EXISTS matcha.likes (
      _id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      id_from INT UNSIGNED NOT NULL,
      id_towards INT UNSIGNED NOT NULL,
      PRIMARY KEY (_id),
      UNIQUE INDEX _id_UNIQUE (_id ASC) VISIBLE);
    `,
    (err, res) => {
      if (err) throw err;
      console.log("Table likes created");
    }
  );
});

exports.modules = conn;
