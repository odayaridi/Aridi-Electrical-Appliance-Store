const db = require("../database/connection");
const CartProdsModel = require("../Models/CartProdsModel");

class CartProdRepository {

  async insertCartProductRepo(cartProd) {
    const sql = "INSERT INTO shopping_cart_items (cart_id,product_id,quantity) values (?,?,?)";
    const [result] = await db.query(sql, [
      cartProd.cartId,
      cartProd.productId,
      cartProd.quantity,
    ]);
    return result;
  }

  async deleteCartProductRepo(cartId, prodId) {
    const sql = "DELETE FROM shopping_cart_items WHERE cart_id = ? AND product_id = ?";
    const [result] = await db.query(sql, [cartId, prodId]);
    return result;
  }

  async getCartProductByIdsRepo(cartId, prodId) {
    const sql ="SELECT * FROM shopping_cart_items WHERE cart_id = ? AND product_id = ?";
    const [result] = await db.query(sql, [cartId, prodId]);
    if(!result[0]){
      return null;
    }
    return CartProdsModel.fromRow(result[0]);
  }

async getCartProductsRepo(cId) {
  const sql = `
    SELECT product_id, name, category_name, image_url, SUM(price * quantity) AS total_price, quantity
    FROM products
    JOIN product_images USING(product_id)
    JOIN shopping_cart_items USING(product_id)
    JOIN shopping_carts USING(cart_id)
    JOIN categories USING(category_id)
    WHERE client_id = ?
    GROUP BY product_id
  `;
  const [result] = await db.query(sql, [cId]);
  return result.map((prod) => ({
    productId: prod.product_id,
    name: prod.name,
    categoryName: prod.category_name,
    imageUrl: prod.image_url,
    totalPrice: prod.total_price,
    quantity: prod.quantity
  }));
}

  async updateCartProdQuantityRepo(quantity, cartId, prodId) {
    const sql = `
    UPDATE shopping_cart_items
    SET quantity = quantity + ?
    WHERE cart_id = ? AND product_id = ?
  `;
    const [result] = await db.query(sql, [quantity, cartId, prodId]);
    return result;
  }

async getCartProductsByIdRepo(cartId) {
  const sql = `
    SELECT product_id, quantity 
    FROM shopping_cart_items 
    WHERE cart_id = ?
  `;
  const [result] = await db.query(sql, [cartId]);
  return result.map((prod) => ({
    productId: prod.product_id,
    quantity: prod.quantity
  }));
}

}

module.exports = CartProdRepository;
