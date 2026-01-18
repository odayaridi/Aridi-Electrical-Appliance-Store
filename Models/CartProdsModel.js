class CartProdsModel {
    constructor(cartId, productId, quantity) {
        this.cartId = cartId;
        this.productId = productId;
        this.quantity = quantity;
    }

    static fromRow(row) {
        return new CartProdsModel(
            row.cart_id,
            row.product_id,
            row.quantity
        )
    }
}


module.exports = CartProdsModel;