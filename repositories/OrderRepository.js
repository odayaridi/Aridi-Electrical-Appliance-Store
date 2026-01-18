const { format } = require("date-fns");
const db = require("../database/connection");
const OrderModel = require("../Models/OrderModel");
class OrderRepository {

 async getCompletedOrdersByClientIdRepo(cId) {
  const sql = `
    SELECT order_id, order_date, username, order_status_name, name, quantity 
    FROM clients  
    JOIN orders USING(client_id) 
    JOIN order_statuses USING(order_status_id) 
    JOIN order_items USING(order_id) 
    JOIN products USING(product_id) 
    WHERE order_status_name = ? AND client_id = ?
  `;
  const [result] = await db.query(sql, ['Completed', cId]);
  return result.map(OrderModel.fromRow);
}


  async getCompletedOrdersRepo() {
    const sql = `
      SELECT order_id, order_date, username, order_status_name, name, quantity 
      FROM clients  
      JOIN orders USING(client_id) 
      JOIN order_statuses USING(order_status_id) 
      JOIN order_items USING(order_id) 
      JOIN products USING(product_id) 
      WHERE order_status_name = ?`;
      
    const [result] = await db.query(sql, ['Completed']);
    return result.map(OrderModel.fromRow);
  }

  async insertOrderRepo(order) {
    const sql = `
      INSERT INTO orders (client_id, order_status_id, order_date) 
      VALUES (?, ?, ?)`;
      
    const [result] = await db.query(sql, [
      order.clientId,
      1, // default status_id
      format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    ]);
    return result;
  }

  async checkValidOrderIdRepo(orderId) {
    const sql = `
      SELECT order_id 
      FROM clients 
      JOIN orders USING (client_id) 
      WHERE status = ? AND order_id = ?`;
      
    const [result] = await db.query(sql, ['active', orderId]);
    return result[0];
  }

  async updateOrderStatusRepo(statusId, orderId) {
    const sql = `UPDATE orders SET order_status_id = ? WHERE order_id = ?`;
    const [result] = await db.query(sql, [statusId, orderId]);
    return result;
  }

  async getTotalOrderAmountRepo(oId) {
    const sql = `
      SELECT SUM(quantity * price) AS amount 
      FROM order_items 
      JOIN products USING (product_id) 
      WHERE order_id = ? 
      GROUP BY order_id`;
      
    const [result] = await db.query(sql, [oId]);
    return result[0];
  }

  async checkProdOrderedByClientRepo(cId, pId) {
    const sql = `
      SELECT client_id, product_id 
      FROM orders 
      JOIN order_items USING(order_id) 
      WHERE client_id = ? AND product_id = ?`;
      
    const [result] = await db.query(sql, [cId, pId]);
    return result[0];
  }
}

module.exports = OrderRepository;
