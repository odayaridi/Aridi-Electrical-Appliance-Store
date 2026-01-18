const { body, param, query } = require("express-validator");

exports.getClientByIdValidator = [
  param("id")
  .notEmpty()
  .withMessage("Client Id should not be empty!")
  .isNumeric()
  .withMessage('Client Id should be a number!')
]

exports.getClientByUsernameValidator = [
  query("username")
  .notEmpty()
  .withMessage("Username should not be empty!")
]

exports.insertClientValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username should not be empty!")
    .isString()
    .withMessage("Username must consist of letters!"),

  body("firstName")
    .notEmpty()
    .withMessage("First Name should not be empty!")
    .isString()
    .withMessage("First Name must consist of letters!"),

  body("lastName")
    .notEmpty()
    .withMessage("Last Name should not be empty!")
    .isString()
    .withMessage("Last Name should consist of characters!"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number should not be empty!")
    .isNumeric()
    .withMessage("Phone number should only contain numbers!"),

  body("email")
    .notEmpty()
    .withMessage("Email should not be empty!")
    .isEmail()
    .withMessage("Invalid Email format!"),

  body("password")
    .notEmpty()
    .withMessage("Password should not be empty!")
    .isLength({ min: 6 })
    .withMessage("Password should consist at least of 6 characters!"),

  body("address")
    .notEmpty()
    .withMessage("Address should not be empty!")
    .isString()
    .withMessage("Invalid address, cannot consist of numbers!"),
];

exports.authenticateClientValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username should not be empty!")
    .isString()
    .withMessage("Username must consist of letters!"),

  body("password")
    .notEmpty()
    .withMessage("Password should not be empty!")
    .isLength({ min: 6 })
    .withMessage("Password should consist at least of 6 characters!"),
];

exports.updateClientValidator = [
   param("cId")
  .notEmpty()
  .withMessage("Client Id should nt be empty!")
  .isNumeric()
  .withMessage('Client Id should be a number!'),

   body("username")
    .notEmpty()
    .withMessage("Username should not be empty!")
    .isString()
    .withMessage("Username must consist of letters!"),

  body("firstName")
    .notEmpty()
    .withMessage("First Name should not be empty!")
    .isString()
    .withMessage("First Name must consist of letters!"),

  body("lastName")
    .notEmpty()
    .withMessage("Last Name should not be empty!")
    .isString()
    .withMessage("Last Name should consist of characters"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number should not be empty!")
    .isNumeric()
    .withMessage("Phone number should only contain numbers!"),

  body("address")
    .notEmpty()
    .withMessage("Address should not be empty!")
    .isString()
    .withMessage("Invalid address, cannot consist of numbers!"),
]

exports.deleteClientValidator = [
  param("cId")
  .notEmpty()
  .withMessage("Client Id should not be empty!")
  .isNumeric()
  .withMessage('Client Id should be a number!')
]

