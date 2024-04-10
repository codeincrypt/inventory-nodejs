const db = require("../utils/db");

module.exports = {
  insertNewProduct: async (item) => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `INSERT INTO product (product_name, product_desc, price, available_quantity, createdAt) VALUES (?,?,?,?,?)`;
      const queryData = await conn.execute(query, [item.title, item.description, item.price, item.quantity, item.date]);
      conn.release();
      return !!(queryData[0].affectedRows);
    } catch (error) {
      console.log("Error in PRODUCT SERVICE ::: insertNewProduct", error);
      return false
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  },
  getProduct: async (limit, offset) => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT product_name AS name, product_desc AS description, price, available_quantity AS quantity FROM product
      ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;
      const queryData = await conn.query(query, [limit, offset]);
      conn.release();
      return queryData[0];
    } catch (error) {
      console.log("Error in PRODUCT SERVICE ::: getProduct", error);
      return false
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  },
  getProductById: async (id) => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT product_name AS name, product_desc AS description, price, available_quantity AS quantity FROM product
      WHERE id = ?`;
      const queryData = await conn.query(query, [id]);
      conn.release();
      return queryData[0].length === 0 ? false : queryData[0];
    } catch (error) {
      console.log("Error in PRODUCT SERVICE ::: getProduct", error);
      return false
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  },
  getProductCount: async () => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT COUNT(*) AS count FROM product`;
      const queryData = await conn.execute(query);
      conn.release();
      return queryData[0];
    } catch (error) {
      console.log("Error in PRODUCT SERVICE ::: getProductCount", error);
      return false
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  },
  getSearchProduct: async (searchquery) => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT product_name AS name, product_desc AS description, price, available_quantity AS quantity FROM product
      WHERE product_name LIKE '%${searchquery}%' OR product_desc LIKE '%${searchquery}%'
      ORDER BY id DESC`;
      const queryData = await conn.query(query);
      conn.release();
      return queryData[0];
    } catch (error) {
      console.log("Error in PRODUCT SERVICE ::: getProduct", error);
      return false
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  },
};
