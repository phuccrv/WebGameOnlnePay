
const mysql = require('mysql2');
const dbConfig = require('../../configs/db.mysql.config');
console.log(dbConfig)

const connectionMySQL = mysql.createConnection({
  host: dbConfig.db.HOST,
  user: dbConfig.db.USER,
  password: dbConfig.db.PASSWORD,
  database: dbConfig.db.DATABASE,
});

connectionMySQL.connect((err) => {
  if (err) throw err;
  console.log('connected');
});

module.exports = connectionMySQL;
