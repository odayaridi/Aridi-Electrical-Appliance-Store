const HttpError = require("../utils/HttpError");
class CartProdService{
    constructor(cartProdRepository){
        this.cartProdRepository = cartProdRepository;
    }

    async getCartProductsService(cId) {
    const response = this.cartProdRepository.getCartProductsRepo(cId);
    return response;
}


   async insertCartProductService(cartProd) {
        //Check if the product is already in the cart
        const checkCartProd = await this.cartProdRepository.getCartProductByIdsRepo(cartProd.cartId, cartProd.productId);
        if (checkCartProd) { //if yes update its quantity and dont re insert it
            const updateQuantity = await this.cartProdRepository.updateCartProdQuantityRepo(cartProd.quantity, cartProd.cartId, cartProd.productId);
            if (!updateQuantity || updateQuantity.affectedRows == 0) {
                throw new HttpError()
            }
            return {
                cartId: cartProd.cartId,
                productId: cartProd.productId,
                quantity: cartProd.quantity + checkCartProd.quantity
            }
        }
        const response = await this.cartProdRepository.insertCartProductRepo(cartProd);
        if (!response || response.affectedRows == 0) {
            throw new HttpError()
        }
        return {
            cartId: cartProd.cartId,
            productId: cartProd.productId,
            quantity: cartProd.quantity
        }
    }

    
    async deleteCartProductService(cartId,prodId){
            const cartProd = await this.cartProdRepository.getCartProductByIdsRepo(cartId,prodId);
            if(!cartProd){
                throw new HttpError('Product in this cart is not found to delete it!',404)
            }
            const response = await this.cartProdRepository.deleteCartProductRepo(cartId,prodId);
            if(!response || response.affectedRows == 0){
                throw new HttpError()
            }
    }

}


module.exports = CartProdService;