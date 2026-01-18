const { body, param, query } = require("express-validator");

exports.getCartProductsValidator = [
   param("cId")
    .notEmpty()
    .withMessage("Client Id should not be empty!")
    .isNumeric()
    .withMessage("Client Id should be a number!"),
]

exports.insertShoppingCartValidator = [
  body("clientId")
    .notEmpty()
    .withMessage("Client Id should not be empty!")
    .isNumeric()
    .withMessage("Client Id should be a number!"),
];

exports.deleteShoppingCartValidator = [
     query("cartId")
    .notEmpty()
    .withMessage("Cart Id should not be empty!")
    .isNumeric()
    .withMessage("Cart Id should be a number!"),

     query("clientId")
    .notEmpty()
    .withMessage("Client Id should not be empty!")
    .isNumeric()
    .withMessage("Client Id should be a number!"),
]

exports.insertCartProductValidator = [
     body("cartId")
    .notEmpty()
    .withMessage("Cart Id should not be empty!")
    .isNumeric()
    .withMessage("Cart Id should be a number!"),

     body("productId")
    .notEmpty()
    .withMessage("Product Id should not be empty!")
    .isNumeric()
    .withMessage("Product Id should be a number!"),

    body("quantity")
    .notEmpty()
    .withMessage("Quantity should have not be empty!")
    .isNumeric()
    .withMessage("Quantity should be a number!")
]

exports.deleteCartProductValidation = [
      query("cartId")
    .notEmpty()
    .withMessage("Cart Id should not be empty!")
    .isNumeric()
    .withMessage("Cart Id should be a number!"),

     query("prodId")
    .notEmpty()
    .withMessage("Product Id should not be empty!")
    .isNumeric()
    .withMessage("Product Id should be a number!")
]