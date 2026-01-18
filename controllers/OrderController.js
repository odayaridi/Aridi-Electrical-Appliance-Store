class OrderController {
    constructor(orderService){
        this.orderService = orderService;
    }

    async getCompletedOrdersController(req,res){
        const data = await this.orderService.getCompletedOrdersService();
        if(data.length !== 0){
             res.status(200).json({success:'true',message:'All Completed orders are retrieved successfully',data});
        }
        else{
             res.status(200).json({success:'true',message:'No Completed orders to retrieve',data});
        } 
    }

    async getCompletedOrdersByClientIdController(req,res){
        const {cId} = req.params;
        const data = await this.orderService.getCompletedOrdersByClientIdService(cId);
        if(data.length !== 0){
            res.status(200).json({success:'true',message:'Completed order(s) for client retrieved successfully',data});
        }
        else{
            res.status(200).json({success:'true',message:'No Completed order(s) for client to retrieve',data});
        }
    }

    async insertOrderController(req,res){
            const order = req.body;
            await this.orderService.insertOrderService(order);
            res.status(201).json({success:'true',message:'Order inserted successfully'});
        }

    async deleteOrderController(req,res){
        const {oId} = req.params;
        await this.orderService.deleteOrderService(oId);
        res.status(204).json({success:'true',message:'Order deleted successfully'});
    }

    async checkProdOrderedByClientController(req,res){
        const {cId,pId} = req.query;
        const data = await this.orderService.checkProdOrderedByClientService(cId,pId);
        if (data){
              res.status(200).json({success:'true',message:'The product is ordered by this client',data});
        }
        else{
              res.status(200).json({success:'true',message:'The product is not ordered by this client',data});
        }
    }
}

module.exports = OrderController;