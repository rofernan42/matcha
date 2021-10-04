const mysql = require("mysql2");
require("./create_database");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "matcha",
  password: "123456",
});

module.exports = pool.promise();
