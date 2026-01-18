const db = require("../database/connection");
const OrderModel = require("../Models/OrderModel");
const OrderProdsModel = require("../Models/OrderProdsModel");
class OrderProdsRepository {

  async getAllOrderProdsRepo() {
    const sql = `
      SELECT order_id, order_date, username, NAME, quantity, order_status_name 
      FROM orders 
      JOIN clients USING(client_id) 
      JOIN order_items USING (order_id) 
      JOIN products USING(product_id) 
      JOIN order_statuses USING(order_status_id) 
      WHERE STATUS = ?`;
      
    const [result] = await db.query(sql, ['active']);
    return result.map(OrderModel.fromRow);
    
  }

 async getOrderProdsByIdRepo(oId) {
  const sql = `
    SELECT product_id, quantity 
    FROM order_items 
    WHERE order_id = ?
  `;
  const [result] = await db.query(sql, [oId]);
  return result.map((prod) => ({
    productId: prod.product_id,
    quantity: prod.quantity
  }));
}


  async insertOrderProdsRepo(orderId, productId, quantity) {
    const sql = "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [orderId, productId, quantity]);
    return result;
  }

  async getOrderProdByIdsRepo(oId, prodId) {
    const sql = 'SELECT * FROM order_items WHERE order_id = ? AND product_id = ?';
    const [result] = await db.query(sql, [oId, prodId]);
    if(!result[0]){
      return null;
    }
    return OrderProdsModel.fromRow(result[0]);
  }

  async deleteOrderProdRepo(oId, pId) {
    const sql = 'DELETE FROM order_items WHERE order_id = ? AND product_id = ?';
    const [result] = await db.query(sql, [oId, pId]);
    return result;
  }

}

module.exports = OrderProdsRepository;
