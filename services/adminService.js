const db = require('../utils/db');

module.exports = {
  loginUser: async (email) => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT email, password FROM admin WHERE email = ? AND status = ?`;
      const response = await conn.execute(query, [email, 1]);
      conn.release();
      return response[0]
    } catch (error) {
      console.error("Error in ADMIN SERVICE ::: loginUser", error);
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
      let query = `SELECT email, name, mobile, id FROM admin WHERE email = ?`;
      const response = await conn.execute(query, [email]);
      conn.release();
      return response[0][0]
    } catch (error) {
      console.error("Error in ADMIN SERVICE ::: getUsersByEmail", error);
      return 2
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  }
}