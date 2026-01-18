const express = require('express');
const ClientController = require('../controllers/ClientController');
const ClientRepository = require('../repositories/ClientRepository');
const ClientService = require('../services/ClientService');
const { insertClientValidator, authenticateClientValidator, getClientByIdValidator, updateClientValidator, deleteClientValidator, getClientByUsernameValidator } = require('../validations/ClientValidation');
const validationRequest = require('../middleware/validateRequest');
const authenticateToken = require('../middleware/authenticate');
const restrictTo = require('../middleware/restrictTo');
const errorCatcher = require('../middleware/errorCatcher');
const ShoppingCartRepository = require('../repositories/ShoppingCartRepository');
const router = express.Router();
const clientRepository = new ClientRepository();
const shoppingCartRepository = new ShoppingCartRepository();
const clientService = new ClientService(clientRepository,shoppingCartRepository);
const clientController = new ClientController(clientService);

router.get('/getClients',authenticateToken,restrictTo('Admin'),errorCatcher(clientController.getClientsController.bind(clientController)));
router.get('/getClientById/:id',authenticateToken,restrictTo('Admin'),getClientByIdValidator,validationRequest,errorCatcher(clientController.getClientByIdController.bind(clientController)));
router.get('/getClientByUsername',authenticateToken,restrictTo('Admin'),getClientByUsernameValidator,validationRequest,errorCatcher(clientController.getClientByUsernameController.bind(clientController)))
router.post('/insert',insertClientValidator,validationRequest,errorCatcher(clientController.insertClientController.bind(clientController)));
router.post('/auth', authenticateClientValidator, validationRequest, errorCatcher(clientController.authenticateClientContoller.bind(clientController)));
router.put('/update/:cId',authenticateToken,updateClientValidator,validationRequest,errorCatcher(clientController.updateClientController.bind(clientController)));
router.delete('/delete/:cId',authenticateToken,deleteClientValidator,validationRequest,errorCatcher(clientController.deleteClientController.bind(clientController)));

module.exports = router;