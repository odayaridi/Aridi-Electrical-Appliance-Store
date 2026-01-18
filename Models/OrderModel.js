class OrderModel {
    constructor(orderId, orderDate, username, orderStatusName, name, quantity) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.username = username;
        this.orderStatusName = orderStatusName;
        this.name = name;
        this.quantity = quantity;
    }

    static fromRow(row){
        return new OrderModel(
            row.order_id,
            row.order_date,
            row.username,
            row.order_status_name,
            row.name,
            row.quantity
        )
    }
}

module.exports = OrderModel;