const { body, param, query } = require("express-validator");
exports.insertOrderValidator = [
  body("cartId")
    .notEmpty()
    .withMessage("Cart Id should not be empty!")
    .isNumeric()
    .withMessage("Cart Id should be a number!"),

  body("clientId")
    .notEmpty()
    .withMessage("Client id should not be empty!")
    .isNumeric()
    .withMessage("Client id should be a number!"),
]

exports.getCompletedOrdersByClientIdValidator=[
  param("cId")
    .notEmpty()
    .withMessage("Client id should not be empty!")
    .isNumeric()
    .withMessage("Client id should be a number!"),
]

exports.deleteOrderValidator= [ 
    param("oId")
    .notEmpty()
    .withMessage("Order id should not be empty!")
    .isNumeric()
    .withMessage("Order id should be a number!"),
]

exports.checkProdOrderedByClientValidator = [
  query("cId")
    .notEmpty()
    .withMessage("Client id should not be empty!")
    .isNumeric()
    .withMessage("Client id should be a number!"),    
  
  query("pId")
    .notEmpty()
    .withMessage("Product Id should not be empty!")
    .isNumeric()
    .withMessage("Product Id should be a number!")
]