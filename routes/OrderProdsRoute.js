const express  = require('express');
const OrderProdsRepository = require('../repositories/OrderProdsRepository');
const OrderProdsService = require('../services/OrderProdsService');
const OrderProdsController = require('../controllers/OrderProdsController');
const authenticateToken = require('../middleware/authenticate');
const restrictTo = require('../middleware/restrictTo');
const errorCatcher = require('../middleware/errorCatcher');
const { deleteOrderProdValidation } = require('../validations/OrderProdsValidation');
const validationRequest = require('../middleware/validateRequest');
const ProductRepositotry = require('../repositories/ProductRepository');
const PaymentRepository = require('../repositories/PaymentRepository');
const router = express.Router();

const paymentRepository = new PaymentRepository();
const productRepository =  new ProductRepositotry();
const orderProdsRepository = new OrderProdsRepository();
const orderProdsService = new OrderProdsService(orderProdsRepository,productRepository,paymentRepository);
const orderProdsController = new OrderProdsController(orderProdsService);



router.get('/getAllOrdersProds',authenticateToken,restrictTo('Admin'),errorCatcher(orderProdsController.getAllOrderProdsController.bind(orderProdsController)));
router.delete('/deleteOrderProd',authenticateToken,restrictTo('Admin'),deleteOrderProdValidation,validationRequest,errorCatcher(orderProdsController.deleteOrderProdController.bind(orderProdsController)));
module.exports = router;