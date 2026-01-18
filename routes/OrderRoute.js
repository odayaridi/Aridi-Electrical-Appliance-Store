const express = require('express');
const authenticateToken = require('../middleware/authenticate');
const { insertOrderValidator, getCompletedOrdersByClientIdValidator, deleteOrderValidator, checkProdOrderedByClientValidator } = require('../validations/OrderValidation');
const validationRequest = require('../middleware/validateRequest');
const restrictTo = require('../middleware/restrictTo');
const OrderRepository = require('../repositories/OrderRepository');
const CartProdRepository = require('../repositories/CartProdsRepository');
const OrderProdsRepository = require('../repositories/OrderProdsRepository');
const ProductRepositotry = require('../repositories/ProductRepository');
const OrderService = require('../services/OrderService');
const OrderController = require('../controllers/OrderController');
const errorCatcher = require('../middleware/errorCatcher');
const ShoppingCartRepository = require('../repositories/ShoppingCartRepository');
const PaymentRepository = require('../repositories/PaymentRepository');
const router = express.Router();

const orderRepository = new OrderRepository();
const cartProdsRepository = new CartProdRepository();
const orderProdsRepository = new OrderProdsRepository();
const productRepository = new ProductRepositotry();
const shoppingCartRepository =  new ShoppingCartRepository();
const paymentRepository = new PaymentRepository();

const orderService = new OrderService(orderRepository,cartProdsRepository,orderProdsRepository,productRepository,shoppingCartRepository,paymentRepository);
const orderController = new OrderController(orderService);
router.get('/getCompletedOrdersByCId/:cId',authenticateToken,restrictTo('Admin'),getCompletedOrdersByClientIdValidator,validationRequest,errorCatcher(orderController.getCompletedOrdersByClientIdController.bind(orderController)));
router.get('/getCompletedOrders',authenticateToken,restrictTo('Admin'),errorCatcher(orderController.getCompletedOrdersController.bind(orderController)));
router.post('/insertOrder',authenticateToken,restrictTo('User'),insertOrderValidator,validationRequest,errorCatcher(orderController.insertOrderController.bind(orderController)));
router.delete('/deleteOrder/:oId',authenticateToken,restrictTo('Admin'),deleteOrderValidator,validationRequest,errorCatcher(orderController.deleteOrderController.bind(orderController)))
router.get('/checkProdOrderByClient',authenticateToken,restrictTo('User'),checkProdOrderedByClientValidator,validationRequest,errorCatcher(orderController.checkProdOrderedByClientController.bind(orderController)));
module.exports = router;