class OrderProdsController {
    constructor(orderProdsService) {
        this.orderProdsService = orderProdsService;
    }


    async deleteOrderProdController(req, res) {
        const order = req.body;
        await this.orderProdsService.deleteOrderProdService(order.orderId, order.name);
        res.status(204).send();
    }

    async getAllOrderProdsController(req, res) {
        const data = await this.orderProdsService.getAllOrderProdsService();
        if (data.length !== 0) {
            res.status(200).json({ success: "true", message: "All orders' products are retrieved successfully", data });
        }
        else {
            res.status(200).json({ success: "true", message: "No orders exist to retrieve their products", data });
        }

    }
}

module.exports = OrderProdsController;