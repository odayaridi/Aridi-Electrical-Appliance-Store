const toAggOrderDTO = require("../DTO/OrderDTO");
const HttpError = require("../utils/HttpError");

class OrderService{
    constructor(orderRepository,cartProdsRepository,orderProdsRepository,productRepository,shoppingCartRepository,paymentRepository){
        this.orderRepository = orderRepository;
        this.cartProdsRepository = cartProdsRepository;
        this.orderProdsRepository = orderProdsRepository;
        this.productRepository = productRepository;
        this.shoppingCartRepository = shoppingCartRepository;
        this.paymentRepository = paymentRepository;
    }


    async getCompletedOrdersByClientIdService(cId){
    const ordersArr = await this.orderRepository.getCompletedOrdersByClientIdRepo(cId);
    if(!ordersArr){
        throw new HttpError();
    }
    const aggArr = []; 
     for (let i = 0; i < ordersArr.length; i++) {
        let found = false;
        for (let j = 0; j < aggArr.length; j++) {
            if(ordersArr[i].orderId === aggArr[j].orderId){
                aggArr[j].products.push({
                    productName: ordersArr[i].name,
                    quantity: ordersArr[i].quantity
                });
                found = true;
                break;
            }
        }

        if(!found){
            aggArr.push(toAggOrderDTO(ordersArr[i]));
        }
    }
    return aggArr;
    }

async getCompletedOrdersService() {
    const ordersArr = await this.orderRepository.getCompletedOrdersRepo();
    if(!ordersArr){
        throw new HttpError()
    }
    const aggArr = []; 
     for (let i = 0; i < ordersArr.length; i++) {
        let found = false;
        for (let j = 0; j < aggArr.length; j++) {
            if(ordersArr[i].orderId === aggArr[j].orderId){
                aggArr[j].products.push({
                    productName: ordersArr[i].name,
                    quantity: ordersArr[i].quantity
                });
                found = true;
                break;
            }
        }

        if(!found){
            aggArr.push(toAggOrderDTO(ordersArr[i]));
        }
    }
    
    return aggArr;
}

    async insertOrderService(order){
            const response = await this.orderRepository.insertOrderRepo(order);
            if(!response || response.affectedRows === 0){
                throw new HttpError();
            }
            const cartProdsArr = await this.cartProdsRepository.getCartProductsByIdRepo(order.cartId);
            if(!cartProdsArr){
                throw new HttpError('There is no products in this cart to retrieve!',404);
            }
              const orderId = response.insertId;
            for (let index = 0; index < cartProdsArr.length; index++) {
                const insertResponse = await this.orderProdsRepository.insertOrderProdsRepo(orderId,cartProdsArr[index].productId,cartProdsArr[index].quantity);
                if(!insertResponse || insertResponse.affectedRows == 0){
                    throw new HttpError()
                }
                const prod = await this.productRepository.getProductQuantityByIdRepo(cartProdsArr[index].productId);
                const updatedQuantity = prod.stockQuantity - cartProdsArr[index].quantity;
                const updateResponse = await this.productRepository.updateProductQuantityRepo(cartProdsArr[index].productId,updatedQuantity);
                if(!updateResponse || updateResponse.affectedRows == 0){
                     throw new HttpError()
                }
                if(updatedQuantity==0){
                    const updateResponse = await this.productRepository.updateProductStatusRepo(2,cartProdsArr[index].productId);
                    if(!updateResponse || updateResponse.affectedRows == 0){
                        throw new HttpError()
                    }
                }
            }
            const deleteCart = await this.shoppingCartRepository.deleteShoppingCartRepo(order.cartId);
            if(!deleteCart || deleteCart.affectedRows == 0){
                throw new HttpError();
            }
            const total = await this.orderRepository.getTotalOrderAmountRepo(orderId);
            if(!total){
                throw new HttpError();
            }
            const insertPayment = await this.paymentRepository.insertPaymentRepo(orderId,total.amount);
            if(!insertPayment || insertPayment.affectedRows === 0){
                throw new HttpError();
            }
    }

    async deleteOrderService(orderId){
        const response = await this.orderRepository.checkValidOrderIdRepo(orderId);
        if(!response){
            throw new HttpError('Order id not found!',404);
        }
        const orderProdsArr = await this.orderProdsRepository.getOrderProdsByIdRepo(orderId);
        if(!orderProdsArr){
            throw new HttpError();
        }
        for (let index = 0; index < orderProdsArr.length; index++) {
            const prod = await this.productRepository.getProductQuantityByIdRepo(orderProdsArr[index].productId);
                if(prod.stockQuantity === 0){
                    const updateStatus = await this.productRepository.updateProductStatusRepo(1,orderProdsArr[index].productId);
                    if(!updateStatus || updateStatus.affectedRows == 0){
                        throw new HttpError();
                    }
                }
                const updatedQuantity = prod.stockQuantity + orderProdsArr[index].quantity;
                const updateResponse = await this.productRepository.updateProductQuantityRepo(orderProdsArr[index].productId,updatedQuantity);
                if(!updateResponse || updateResponse.affectedRows == 0){
                     throw new HttpError();
                }
        }
        const updateOrderStatus = await this.orderRepository.updateOrderStatusRepo(2,orderId);
        if(!updateOrderStatus || updateOrderStatus.affectedRows === 0){
            throw new HttpError();
        }
        const updatePaymentStatus = await this.paymentRepository.updatePaymentStatusRepo(2,orderId);
        if(!updatePaymentStatus || updatePaymentStatus.affectedRows === 0){
            throw new HttpError();
        }

    }

    async checkProdOrderedByClientService(cId,pId){
        const response = await this.orderRepository.checkProdOrderedByClientRepo(cId,pId);
        if(!response){
            return null;
        }
        return response;
    }
}


module.exports = OrderService;