const mysql = require("mysql2");
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = require("./config");

function createPool(){
  try {
    const pool = mysql.createPool({
      connectionLimit: 10,
      user      : DB_USER,
      password  : DB_PASS,
      host      : DB_HOST,
      database  : DB_NAME,
    })
    const promisePool = pool.promise()
    return promisePool
  } catch (error) {
    return console.error("Could not connect with MYHSQL DB", error)
  }
}

const pool = createPool()

module.exports = {
  connection : async () => pool.getConnection(),
  execute : async () => pool.execute(...arguments),
}