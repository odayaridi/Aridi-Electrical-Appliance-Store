const ToProperResponseDTO = require("../DTO/ProductDTO");
const HttpError = require("../utils/HttpError");

class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

async getProductsService() {
      const productsArr = await this.productRepository.getProductsRepo();
      let properResponse = [];
      for (let index = 0; index < productsArr.length; index++) {
            const imagesArray = productsArr[index].imageUrls.split(',');
            properResponse[index] = ToProperResponseDTO(productsArr[index],imagesArray);
      }
      return properResponse;
  }


  async getProductsByCategoryService(categoryName){
      const productsArr = await this.productRepository.getProductsByCategoryRepo(categoryName);
      let properResponse = [];
      for (let index = 0; index < productsArr.length; index++) {
            const imagesArray = productsArr[index].imageUrls.split(',');
            properResponse[index] = ToProperResponseDTO(productsArr[index],imagesArray);
      }
      return properResponse;
  }

  async updateProductQuantityService(prodId,newQuantity){
    const prod = await this.productRepository.getProductByIdRepo(prodId);
      if(!prod){
        throw new HttpError('Product not found with this id!',404);
      }
    const response = await this.productRepository.updateProductQuantityRepo(prodId,newQuantity);
    if(!response){
      throw new HttpError();
    }
  }


 async getProductByIdService(pId) {
      const prod = await this.productRepository.getProductByIdRepo(pId);
      if(!prod){
        throw new HttpError('Product not found with id!',404);
      }
        let imgsArr = [];
        for (let index = 0; index < prod.length; index++) {
            imgsArr[index] = prod[index].imageUrl
        }
        const properResponse = ToProperResponseDTO(prod[0],imgsArr)
        return properResponse;
  }

  async getProductByNameService(name){
        const productsArr = await this.productRepository.getProductByNameRepo(name);
      let properResponse = [];
      for (let index = 0; index < productsArr.length; index++) {
            const imagesArray = productsArr[index].imageUrls.split(',');
            properResponse[index] = ToProperResponseDTO(productsArr[index],imagesArray);
      }
      return properResponse;
  }

  async getProductByNameAndCategoryService(name,category){
      const productsArr = await this.productRepository.getProductByNameAndCategoryRepo(name,category);
      let properResponse = [];
      for (let index = 0; index < productsArr.length; index++) {
            const imagesArray = productsArr[index].imageUrls.split(',');
            properResponse[index] = ToProperResponseDTO(productsArr[index],imagesArray);
      }
      return properResponse;
  }

  async getProductQuantityByIdService(prodId){
      const prod = await this.productRepository.getProductByIdRepo(prodId);
      if(!prod){
        throw new HttpError("Product does not exist to fetch it's quantity!",404)
      }
      const response = await this.productRepository.getProductQuantityByIdRepo(prodId);
      return response;
  }
}

module.exports = ProductService;
