const db = require("../database/connection");
const ShoppingCartModel = require("../Models/ShoppingCartModel");

class ShoppingCartRepository {
    async getCartIdByClientIdRepo(clientId) {
        const sql = 'SELECT cart_id FROM shopping_carts WHERE client_id = ?';
        const [result] = await db.query(sql, [clientId]);
        if(!result[0]){
            return null;
        }
        return {
            cartId:result[0].cart_id
        };
    }

    async insertShoppingCartRepo(clientId) {
        const sql = "INSERT INTO shopping_carts (client_id) values (?)";
        const [result] = await db.query(sql, [clientId]);
        return result;
    }

    async deleteShoppingCartRepo(cartId) {
        const sql = "DELETE FROM shopping_carts WHERE cart_id = ? ";
        const [result] = await db.query(sql, [cartId]);
        return result;
    }

    async getShoppingCartByIdsRepo(cartId, clientId) {
        const sql = "SELECT * FROM shopping_carts WHERE cart_id = ? AND client_id = ? ";
        const [result] = await db.query(sql, [cartId, clientId]);
        return ShoppingCartModel.fromRow(result[0]);
    }
}

module.exports = ShoppingCartRepository;
