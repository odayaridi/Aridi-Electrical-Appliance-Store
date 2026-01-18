class ProductReviewController{
    constructor(productReviewService){
        this.productReviewService = productReviewService;
    }

    async getAllProdRevsController(req,res){
        const data = await this.productReviewService.getAllProdRevsService();
        if(data.length !== 0){
             res.status(200).json({success: 'true', message: "Product Reviews retrieved successfully",data});
        }
        else{
              res.status(200).json({success: 'true', message: "There are no product reviews to retrieve",data});
        }
    }


    async getProdRevsByNameController(req,res){
         const {username} = req.query;
         const data = await this.productReviewService.getProdRevsByNameService(username);
          if(data.length !== 0){
             res.status(200).json({success: 'true', message: "Product Reviews by this client retrieved successfully",data});
        }
        else{
              res.status(200).json({success: 'true', message: "There are no product reviews for this client to retrieve",data});
        }
    }

     async insertProdRevController(req,res){
        const prodRev = req.body;
        const data = await this.productReviewService.insertProdRevService(prodRev);
         res.status(201).json({success: 'true', message: "Product Review inserted successfully",data});
     }
}

module.exports = ProductReviewController;