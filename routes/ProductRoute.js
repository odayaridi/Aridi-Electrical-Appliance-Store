const express  = require('express');
const ProductRepositotry = require('../repositories/ProductRepository');
const ProductService = require('../services/ProductService');
const ProductController = require('../controllers/ProductController');
const authenticateToken = require('../middleware/authenticate');
const { getProductByIdValidator, getProductByCategoryValidator, getProductByNameValidator, updateProductQuantityValidator, getProductByNameAndCategoryValidator } = require('../validations/ProductValidation');
const validationRequest = require('../middleware/validateRequest');
const errorCatcher = require('../middleware/errorCatcher');
const restrictTo = require('../middleware/restrictTo');
const router = express.Router();

const productRepository = new ProductRepositotry();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.get('/getAllProducts',authenticateToken,errorCatcher(productController.getProductsController.bind(productController)));
router.get('/getProductById/:pId',authenticateToken,getProductByIdValidator,validationRequest,errorCatcher(productController.getProductByIdController.bind(productController)));
router.get('/getProductsByCategory',getProductByCategoryValidator,validationRequest,errorCatcher(productController.getProductsByCategoryController.bind(productController)));
router.put('/updateProdQuantity',authenticateToken,restrictTo('Admin'),updateProductQuantityValidator,validationRequest,errorCatcher(productController.updateProductQuantityController.bind(productController)));
router.get('/getProductByName', authenticateToken,getProductByNameValidator,validationRequest,errorCatcher(productController.getProductByNameController.bind(productController)));
router.get('/getProductQuanityById/:pId', authenticateToken,getProductByIdValidator,validationRequest,errorCatcher(productController.getProductQuantityByIdController.bind(productController)));
router.get('/getProductByNameAndCategory',authenticateToken,getProductByNameAndCategoryValidator,validationRequest,errorCatcher(productController.getProductByNameAndCategoryController.bind(productController)));
module.exports = router;