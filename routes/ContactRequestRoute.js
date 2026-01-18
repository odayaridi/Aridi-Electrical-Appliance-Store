const express = require('express');
const authenticateToken = require('../middleware/authenticate');
const restrictTo = require('../middleware/restrictTo');
const validationRequest = require('../middleware/validateRequest');
const ContactRequestRepository = require('../repositories/ContactRequestRepository');
const ContactRequestService = require('../services/ContactRequestService');
const ContactRequestController = require('../controllers/ContactRequestController');
const { insertContactRequestValidator, getContactRequestsByNameValidator } = require('../validations/ContactRequestValidation');
const errorCatcher = require('../middleware/errorCatcher');
const router = express.Router();

const contactrequestRepo = new ContactRequestRepository();
const contactrequestService = new ContactRequestService(contactrequestRepo);
const contactrequestController = new ContactRequestController(contactrequestService);

router.get('/getContactRequests',authenticateToken,restrictTo('Admin'),errorCatcher(contactrequestController.getAllContactRequestsController.bind(contactrequestController)));
router.get('/getContReqByName',authenticateToken,restrictTo('Admin'),getContactRequestsByNameValidator,validationRequest,errorCatcher(contactrequestController.getContactRequestsByNameController.bind(contactrequestController)))
router.post('/insertContReq',authenticateToken,restrictTo('User'),insertContactRequestValidator,validationRequest,errorCatcher(contactrequestController.insertContactRequestController.bind(contactrequestController)));

module.exports = router;