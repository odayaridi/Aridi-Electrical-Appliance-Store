const db = require("../database/connection");
const ProductReviewModel = require("../Models/ProductReviewModel");

class ProductReviewRepository {
    async getAllProdRevsRepo() {
        const sql = 'SELECT review_id, username, name, review_text, pr.created_at FROM clients JOIN product_reviews pr USING(client_id) JOIN products USING(product_id)';
        const [rows] = await db.query(sql);
        return rows.map(row => ProductReviewModel.fromRow(row));
    }

    async getProdRevsByNameRepo(username) {
        const sql = 'SELECT review_id, username, name, review_text, pr.created_at FROM clients JOIN product_reviews pr USING(client_id) JOIN products USING(product_id) WHERE username = ?';
        const [rows] = await db.query(sql, [username]);
        return rows.map(row => ProductReviewModel.fromRow(row));
    }

    async insertProdRevRepo(prodRev) {
        const sql = 'INSERT INTO product_reviews (client_id, product_id, review_text) VALUES (?, ?, ?)';
        const [result] = await db.query(sql, [prodRev.clientId, prodRev.productId, prodRev.reviewText]);
        return result;
    }
}

module.exports = ProductReviewRepository;
