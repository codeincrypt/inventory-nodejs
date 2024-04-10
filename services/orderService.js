const db = require('../utils/db');
const moment = require('moment-timezone');

module.exports = {
  checkQuantity : async (productId) => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT * FROM product WHERE id = ?`;
      const response = await conn.execute(query, [productId]);
      return response[0]
    } catch (error) {
      console.error("Error in ORDER SERVICE ::: createNewOrder", error);
      return 2
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  },
  updateStockQuantity : async (quantity, productId) => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `UPDATE product SET available_quantity  = ? WHERE id = ?`;
      const response = await conn.execute(query, [quantity, productId]);
      return response[0]
    } catch (error) {
      console.error("Error in ORDER SERVICE ::: createNewOrder", error);
      return 2
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  },
  createNewOrder : async (userId, totalPrice, orderDetails) => {
    let conn = null;
    moment().tz("Asia/Calcutta").format();
    process.env.TZ = 'Asia/Calcutta';
    let date = moment().format('DD-MM-YYYY');
    try {
      conn = await db.connection();
      let query = `INSERT INTO orders (userid, total_price, status, orderdate) VALUES (?, ?, ?, ?)`;
      const response = await conn.execute(query, [userId, totalPrice, 0, date]);
      let orderId = response[0].insertId
     
      for (const item of orderDetails){
        let queryOrders = `INSERT INTO orderdetails (product_id, quantity, price, order_id) VALUES (?, ?, ?, ?)`;
        await conn.execute(queryOrders, [item.productid, item.quantity, item.price, orderId]);
      }
      conn.release();
      return response[0]
    } catch (error) {
      console.error("Error in ORDER SERVICE ::: createNewOrder", error);
      return 2
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  },
  getOrdersByUserId: async (userId, limit, offset) => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT * FROM orders WHERE userid = ? ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;
      const response = await conn.execute(query, [userId]);
      conn.release();
      return response[0]
    } catch (error) {
      console.error("Error in ORDER SERVICE ::: createNewUser", error);
      return 2
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  },
  getOrdersViewByUserId: async (userId, orderId) => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT id, total_price, status, orderdate FROM orders WHERE userid = ? AND id = ?`;
      const response = await conn.execute(query, [userId, orderId]);
      let querydetails = `SELECT ord.id, prod.product_name, ord.product_id, ord.quantity, ord.price FROM orderdetails ord
      JOIN product AS prod
      ON ord.product_id = prod.id
      WHERE ord.order_id = ?`;
      const responseDetails = await conn.execute(querydetails, [orderId]);
      conn.release();
      let output = {
        order : response[0][0],
        details : responseDetails[0]
      }
      if(response[0].length === 0){
        return false
      } else {
        return output
      }
    } catch (error) {
      console.error("Error in ORDER SERVICE ::: createNewUser", error);
      return 2
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  },
  getUserOrderCount: async (userId) => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT COUNT(*) AS count FROM orders WHERE userid = ?`;
      const response = await conn.execute(query, [userId]);
      conn.release();
      return response[0]
    } catch (error) {
      console.error("Error in ORDER SERVICE ::: createNewUser", error);
      return 2
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  },
  userOrders : async (req, res) => {
    const userId = req.params.id
    try {
      const users = await orderService.getUsersOrders(userId);
      return res.json({statusCode:1, message:'Profile fetch successfully', data:users});
    } catch (error) {
      console.log("Error in ORDER SERVICE -- userOrders :: ", error);
      return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
    }
  },
  getTopOrderedProduct : async (limit, offset) => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT 
          p.id AS product_id, 
          p.product_name, 
          p.product_desc, 
          p.price AS product_price, 
          p.available_quantity AS available_quantity,
          SUM(od.quantity) AS total_ordered_quantity
      FROM 
          orderdetails od
      JOIN 
          product p ON od.product_id = p.id
      GROUP BY 
          od.product_id
      ORDER BY 
          total_ordered_quantity DESC
      LIMIT ${limit} OFFSET ${offset}`;

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
  getTopOrderedProductCount : async () => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT 
          p.id AS product_id, 
          p.product_name, 
          p.product_desc, 
          p.price AS product_price, 
          p.available_quantity AS available_quantity,
          SUM(od.quantity) AS total_ordered_quantity
      FROM 
          orderdetails od
      JOIN 
          product p ON od.product_id = p.id
      GROUP BY 
          od.product_id
      ORDER BY 
          total_ordered_quantity DESC`;

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
    getTopUserOrders : async () => {
    let conn = null;
    try {
      conn = await db.connection();
      let query = `SELECT 
        u.id AS id, 
        u.name AS name, 
        COUNT(o.id) AS total_orders_placed
        FROM 
            users u
        JOIN 
            orders o ON u.id = o.userid
        GROUP BY 
            u.id
        ORDER BY 
            total_orders_placed DESC;`;

      const queryData = await conn.execute(query);
      conn.release();
      return queryData[0];
    } catch (error) {
      console.log("Error in ORDER SERVICE ::: getTopUserOrders", error);
      return false
    } finally {
      if (conn !== null) {
        conn.destroy();
      }
    }
  }
}