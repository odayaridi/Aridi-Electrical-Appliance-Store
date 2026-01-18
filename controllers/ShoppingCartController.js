class ShoppingCartController{
    constructor(shoppingCartService,cartProdService){
        this.shoppingCartService = shoppingCartService;
        this.cartProdService = cartProdService;
    }

    async getCartProductsController(req,res){
        const {cId} = req.params;
        const data = await this.cartProdService.getCartProductsService(cId);
        if(data.length !== 0){
                res.status(200).json({success:'true',message:'Cart products retrieved successfully',data});
        }
        else{
                 res.status(200).json({success:'true',message:'No Cart products exist to retrieve',data});
        }
    }

    async insertShoppingCartController(req,res){
            const { clientId } = req.body;
            const data = await this.shoppingCartService.insertShoppingCartService(clientId);
            res.status(201).json({success:'true',message:'Shopping Cart inserted successfully',data});
    }

    async deleteShoppingCartController(req,res){
            const { cartId,clientId } = req.query;
            await this.shoppingCartService.deleteShoppingCartService(cartId,clientId);
            res.status(204).send();
    }

    async insertCartProductController(req,res){
            const cartProd = req.body;
            const data = await this.cartProdService.insertCartProductService(cartProd);
            res.status(201).json({success:'true',message:'Product(s) inserted successfully in the shopping cart',data});
    }

    async deleteCartProductController(req,res){
            const {cartId, prodId} = req.query;
            await this.cartProdService.deleteCartProductService(cartId,prodId);
            res.status(204).send();
    }
}

module.exports = ShoppingCartController;