const { format } = require("date-fns");
const db = require("../database/connection");

class PaymentRepository {
    async insertPaymentRepo(orderId, amount) {
        const sql = 'INSERT INTO payments (order_id, status_id, amount, paid_at) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(sql, [
            orderId,
            1, // default status_id
            amount,
            format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        ]);
        return result;
    }

    async updatePaymentStatusRepo(statusId, orderId) {
        const sql = 'UPDATE payments SET status_id = ? WHERE order_id = ?';
        const [result] = await db.query(sql, [statusId, orderId]);
        return result;
    }

    async getTotalOrderPriceRepo(oId) {
        const sql = 'SELECT amount FROM payments WHERE order_id = ?';
        const [result] = await db.query(sql, [oId]);
        return result[0];
    }

    async updateTotalOrderAmountRepo(oId, newAmount) {
        const sql = 'UPDATE payments SET amount = ? WHERE order_id = ?';
        const [result] = await db.query(sql, [newAmount, oId]);
        return result;
    }
}

module.exports = PaymentRepository;
