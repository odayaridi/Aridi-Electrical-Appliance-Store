const express = require('express');
const authenticateToken = require('../middleware/authenticate');
const restrictTo = require('../middleware/restrictTo');
const { insertProdRevValidator, getProdRevsByNameController } = require('../validations/ProductReviewValidation');
const validationRequest = require('../middleware/validateRequest');
const ProductReviewRepository = require('../repositories/ProductReviewRepository');
const ProductReviewService = require('../services/ProductReviewService');
const ProductReviewController = require('../controllers/ProductReviewController');
const errorCatcher = require('../middleware/errorCatcher');
const ClientRepository = require('../repositories/ClientRepository');
const router = express.Router();

const clientRepository = new ClientRepository();
const productReviewRepository = new ProductReviewRepository();
const productReviewService = new ProductReviewService(productReviewRepository,clientRepository);
const productReviewController = new ProductReviewController(productReviewService);

router.get('/getProdRevsByName',authenticateToken,restrictTo('Admin'),getProdRevsByNameController,validationRequest,productReviewController.getProdRevsByNameController.bind(productReviewController))
router.get('/getProdRevs',authenticateToken,restrictTo('Admin'),errorCatcher(productReviewController.getAllProdRevsController.bind(productReviewController)));
router.post('/insertProdRev',authenticateToken,restrictTo('User'),insertProdRevValidator,validationRequest,errorCatcher(productReviewController.insertProdRevController.bind(productReviewController)));


module.exports = router;