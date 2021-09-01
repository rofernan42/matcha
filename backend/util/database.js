// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// const MONGODB_URI =
//   "mongodb+srv://rofernan:YIpPjcBhm5BEkclQ@cluster0.ub4t7.mongodb.net/matcha";

// let _db;

// const mongoConnect = callback => {
//     MongoClient.connect(MONGODB_URI)
//     .then(client => {
//         _db = client.db();
//         callback();
//     })
//     .catch((err) => {
//         throw err;
//     });
// };

// const getDb = () => {
//     if (_db) {
//         return _db;
//     }
//     throw "No database found";
// }

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;



const mysql = require("mysql2");
const connect = require("./create_database");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "matcha",
  password: "123456",
});

module.exports = pool.promise();
