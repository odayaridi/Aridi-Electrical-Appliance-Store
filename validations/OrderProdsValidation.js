const { body, query, param } = require('express-validator');

exports.deleteOrderProdValidation = [
    body("orderId")
        .notEmpty()
        .withMessage("Order id should not be empty!")
        .isNumeric()
        .withMessage("Order id should be a number!"),

    body("name")
        .notEmpty()
        .withMessage("Product name should not be empty!")
        .isString()
        .withMessage("Product Name should consist of letters!")
]