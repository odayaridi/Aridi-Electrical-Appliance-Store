const {body,param,query} = require('express-validator');

exports.getContactRequestsByNameValidator = [
    query("fullName")
     .notEmpty()
    .withMessage("Full name should not be empty!")
    .isString()
    .withMessage("Full name should be valid containing letters!"),
]

exports.insertContactRequestValidator = [
    body("clientId")
    .notEmpty()
    .withMessage("Client Id cannot be empty!")
    .isNumeric()
    .withMessage("Client Id should be a numeric value!"),

    body("fullName")
    .notEmpty()
    .withMessage("Full name should not be empty!")
    .isString()
    .withMessage("Full name should be valid containing letters!"),

    body("subject")
     .notEmpty()
    .withMessage("Subject should not be empty!"),

    body("message")
     .notEmpty()
    .withMessage("Message should not be empty!"),
]