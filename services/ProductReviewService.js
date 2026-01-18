const HttpError = require("../utils/HttpError");

class ProductReviewService{
    constructor(productReviewRepository,clientRepository){
        this.productReviewRepository = productReviewRepository;
        this.clientRepository = clientRepository;
    }

    async getAllProdRevsService(){
        const response = await this.productReviewRepository.getAllProdRevsRepo();
        if(!response){
            throw new HttpError();
        }
        return response;
    }

    async getProdRevsByNameService(username){
        const client = await this.clientRepository.getClientByUsernameRepo(username);
        if(!client){
              throw new HttpError('Client does not exist with this username to retrieve the product reviews!',404)
        }
        const response = await this.productReviewRepository.getProdRevsByNameRepo(username);
        if(!response){
            throw new HttpError();
        }
        return response;
    }


    async insertProdRevService(prodRev){
        const response = await this.productReviewRepository.insertProdRevRepo(prodRev);
        if(!response || response.affectedRows === 0){
            throw new HttpError();
        }
        return {
            reviewId: response.insertId,
            clientId: prodRev.clientId,
            productId: prodRev.productId,
            reviewText: prodRev.reviewText
        }
    }
}

module.exports = ProductReviewService;