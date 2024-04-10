const db = require('../utils/db');

module.exports = {
  createNewUser: async (item) => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT COUNT(*) AS count FROM users WHERE email = ? OR mobile = ?`;
      const existingData = await conn.execute(query, [item.email, item.phone]);
      if(existingData[0][0].count === 0){
        let query = `INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)`;
        await conn.execute(query, [item.name, item.email, item.phone, item.password]);
        conn.release();
        return 1
      } else {
        conn.release();
        return 0
      }
    } catch (error) {
      console.error("Error in USER SERVICE ::: createNewUser", error);
      return 2
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  },
  loginUser: async (email) => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT email, name, id, password FROM users WHERE email = ? AND status = ?`;
      const response = await conn.execute(query, [email, 1]);
      conn.release();
      return response[0]
    } catch (error) {
      console.error("Error in USER SERVICE ::: loginUser", error);
      return 2
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  },
  getUsersByEmail : async (email) => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT email, name, mobile, id FROM users WHERE email = ?`;
      const response = await conn.execute(query, [email]);
      conn.release();
      return response[0][0]
    } catch (error) {
      console.error("Error in USER SERVICE ::: getUsersByEmail", error);
      return 2
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  }
}