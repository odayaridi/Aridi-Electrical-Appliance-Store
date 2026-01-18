class OrderProdsModel{
    constructor(orderId,productId,quantity){
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
    }

    static fromRow(row){
        return new OrderProdsModel(
            row.order_id,
            row.product_id,
            row.quantity
        );
    }
}

module.exports = OrderProdsModel;