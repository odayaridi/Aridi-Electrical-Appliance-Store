class ShoppingCartModel{
    constructor(cartId,clientId,createdAt){
        this.cartId = cartId;
        this.clientId = clientId;
        this.createdAt = createdAt;
    }

    static fromRow(row){
        return new ShoppingCartModel(
            row.cart_id,
            row.client_id,
            row.createdAt
        )
    }
}

module.exports = ShoppingCartModel;