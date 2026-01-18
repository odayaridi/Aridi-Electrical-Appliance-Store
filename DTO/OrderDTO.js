const toAggOrderDTO = (order)=>{
   return {
                orderId:  order.orderId,
                orderDate:  order.orderDate,
                clientName:  order.username,
                orderStatus:  order.orderStatusName,
                products: [
                    {
                        productName: order.name,
                        quantity: order.quantity
                    }
                ]
            }
}

module.exports = toAggOrderDTO;