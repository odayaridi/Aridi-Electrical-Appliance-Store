const { body, param, query } = require("express-validator");

exports.getProdRevsByNameController = [
   query("username")
    .notEmpty()
    .withMessage("Username should not be empty!")
    .isString()
    .withMessage("Username must consist of letters!"),
]
exports.insertProdRevValidator = [
  body("clientId")
    .notEmpty()
    .withMessage("Client Id should nt be empty!")
    .isNumeric()
    .withMessage("Client Id should be a number!"),

  body("productId")
    .notEmpty()
    .withMessage("Product Id should not be empty!")
    .isNumeric()
    .withMessage("Product Id be a number!"),

  body("reviewText")
    .notEmpty()
    .withMessage("Review text should not be empty!")
    .isString()
    .withMessage("Review text should not consist of numbers!"),
];
