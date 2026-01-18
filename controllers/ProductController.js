class ProductController{
    constructor(productService){
        this.productService = productService;
    }

    async getProductsController (req,res){
            const data = await this.productService.getProductsService();
            if(data.length === 0){
                res.status(200).json({success: 'true', message: "No Products exist to retrieve",data});
            }
            else{
                 res.status(200).json({success: 'true', message: "Products retrieved successfully",data});
            } 
    }

    async getProductByIdController (req,res){
            const { pId } = req.params;
            const data = await this.productService.getProductByIdService(pId);
            res.status(200).json({success: 'true', message: "Product retrieved successfully through id",data});
    }

    async updateProductQuantityController (req,res) {
            const {pId,quantity} = req.query;
            await this.productService.updateProductQuantityService(pId,quantity);
            res.status(200).json({success: 'true', message: "Product Quantity updated successfully"});
    }

    async getProductsByCategoryController(req,res){
            const {cName} = req.query;
            const data = await this.productService.getProductsByCategoryService(cName);
            if(data.length !== 0){
                res.status(200).json({success: 'true', message: "Products retrieved successfully through category",data});
            }
            else{
                 res.status(200).json({success: 'true', message: "No products with this category exist to retrieve",data});
            }
    }

    async getProductByNameController(req,res){
            const {pName} = req.query;
            const data = await this.productService.getProductByNameService(pName);
             res.status(200).json({success: 'true', message: "Product retrieved successfully through name",data});
    }

    async getProductByNameAndCategoryController(req,res){
        const {pName,cName} = req.query;
        const data = await this.productService.getProductByNameAndCategoryService(pName,cName);
        if(data.length !== 0){
                res.status(200).json({success: 'true', message: "Product retrieved successfully through name and category",data});
        }
        else{
                res.status(200).json({success: 'true', message: "No product with this category and name exist to retrieve",data});
        }
       
    }

    async getProductQuantityByIdController(req,res){
            const {pId} = req.params;
            const data = await this.productService.getProductQuantityByIdService(pId);
             res.status(200).json({success: 'true', message: "Product quantity retrieved successfully through Id",data});
    }
}


module.exports = ProductController;