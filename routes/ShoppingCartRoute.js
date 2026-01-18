const express = require('express');
const authenticateToken = require('../middleware/authenticate');
const restrictTo = require('../middleware/restrictTo');
const { insertShoppingCartValidator, deleteShoppingCartValidator, insertCartProductValidator, deleteCartProductValidation, getCartProductsValidator } = require('../validations/ShoppingCartValidation');
const ShoppingCartRepository = require('../repositories/ShoppingCartRepository');
const ShoppingCartService = require('../services/ShoppingCartService');
const ShoppingCartController = require('../controllers/ShoppingCartController');
const validationRequest = require('../middleware/validateRequest');
const CartProdRepository = require('../repositories/CartProdsRepository');
const CartProdService = require('../services/CartProdsService');
const errorCatcher = require('../middleware/errorCatcher');
const router = express.Router();

const cartProdRepository = new CartProdRepository();
const cartProdService = new CartProdService(cartProdRepository);
const shoppingCartRepository =  new ShoppingCartRepository();
const shoppingCartService = new ShoppingCartService(shoppingCartRepository);
const shoppingCartController =  new ShoppingCartController(shoppingCartService,cartProdService);

router.get('/getCartProdsById/:cId',authenticateToken,restrictTo('User'),getCartProductsValidator,validationRequest,errorCatcher(shoppingCartController.getCartProductsController.bind(shoppingCartController)));
router.post('/insertCart',authenticateToken,restrictTo('User'),insertShoppingCartValidator,validationRequest,errorCatcher(shoppingCartController.insertShoppingCartController.bind(shoppingCartController)));
router.delete('/deleteCart',authenticateToken,restrictTo('User'),deleteShoppingCartValidator,validationRequest,errorCatcher(shoppingCartController.deleteShoppingCartController.bind(shoppingCartController)));
router.post('/insertCartProd',authenticateToken,restrictTo('User'),insertCartProductValidator,validationRequest,errorCatcher(shoppingCartController.insertCartProductController.bind(shoppingCartController)));
router.delete('/deleteCartProd',authenticateToken,restrictTo('User'),deleteCartProductValidation,validationRequest,errorCatcher(shoppingCartController.deleteCartProductController.bind(shoppingCartController)));
module.exports = router;