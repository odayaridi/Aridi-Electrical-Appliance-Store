const HttpError = require("../utils/HttpError");

class OrderProdsService {
    constructor(orderProdsRepository, productRepository,paymentRepository) {
        this.orderProdsRepository = orderProdsRepository;
        this.productRepository = productRepository;
        this.paymentRepository = paymentRepository;
    }

    async getAllOrderProdsService() {
        const response = this.orderProdsRepository.getAllOrderProdsRepo();
        if (!response) {
            throw new HttpError();
        }
        return response;
    }

    async deleteOrderProdService(oId, prodName) {
     const prod = await this.productRepository.getProductByNameRepo(prodName);
        // We used prod.length>1 to check whether the admin entered general name that may retrieve more than one prod. The admin should put the exact name
        if (!prod || prod.length>1) {
            throw new HttpError("Product does not exist to delete it!", 404);
        }
        const orderProd = await this.orderProdsRepository.getOrderProdByIdsRepo(oId, prod.productId);
        if (!orderProd) {
            throw new HttpError('Order product is not found!', 404);
        }

        const orderProdsArr = await this.orderProdsRepository.getOrderProdsByIdRepo(oId);
        if(!orderProdsArr){
            throw new HttpError();
        }
        if(orderProdsArr.length === 1){
            throw new HttpError('There is only one product in the order, delete the order instead!', 400);
        }

        if (prod.stockQuantity === 0) {
            const updateStatus = await this.productRepository.updateProductStatusRepo(1, prod.productId);
            if (!updateStatus || updateStatus.affectedRows == 0) {
                throw new HttpError();
            }
        }
        const updatedQuantity = prod.stockQuantity + orderProd.quantity;
        const updatedResult = await this.productRepository.updateProductQuantityRepo(prod.productId, updatedQuantity);
        if (!updatedResult || updatedResult.affectedRows === 0) {
            throw new HttpError();
        }
        const originalPriceProd = await this.productRepository.getProductPriceByIdRepo(orderProd.productId);
        const totalOrderAmount = await this.paymentRepository.getTotalOrderPriceRepo(oId);
        if(!originalPriceProd || !totalOrderAmount){
            throw new HttpError();
        }
        const totalModifiedPayment = totalOrderAmount.amount - originalPriceProd.price;
        const updatedPayment = await this.paymentRepository.updateTotalOrderAmountRepo(oId,totalModifiedPayment);
        if(!updatedPayment || updatedPayment.affectedRows === 0){
            throw new HttpError();
        }
        const updatedStatus = await this.paymentRepository.updatePaymentStatusRepo(3,oId);
        if(!updatedStatus || updatedStatus.affectedRows === 0){
            throw new HttpError();
        }
        const deleteResponse = await this.orderProdsRepository.deleteOrderProdRepo(oId,orderProd.productId);
        if(!deleteResponse || deleteResponse.affectedRows === 0){
            throw new HttpError();
        }

    }

}

module.exports = OrderProdsService;