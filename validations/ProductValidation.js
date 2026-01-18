const {body,param,query} = require('express-validator');
const HttpError = require('../utils/HttpError');

exports.getProductByIdValidator = [
   param("pId")
  .notEmpty()
  .withMessage("Product Id should not be empty!")
  .isNumeric()
  .withMessage('Product Id should be a number!')
]

exports.getProductByCategoryValidator= [
    query("cName")
    .notEmpty()
    .withMessage("Category name should not be empty!")
    .isString()
    .withMessage("Category Name should consist of letters!")
]

exports.updateProductQuantityValidator = [
    query("pId")
  .notEmpty()
  .withMessage("Product Id should not be empty!")
  .isNumeric()
  .withMessage('Product Id should be a number!'),

  query("quantity")
  .notEmpty()
  .withMessage("Quantity should not be empty!")
  .isNumeric()
  .withMessage("Quantity should be a number!")
  .custom((value) => {
    if (Number(value) <= 0) {
      throw new HttpError("Quantity must be greater than zero!");
    }
    return true;
  }),
]

exports.getProductByNameValidator = [
     query("pName")
    .notEmpty()
    .withMessage("Product name should not be empty!")
    .isString()
    .withMessage("Product Name should consist of letters!")
]

exports.getProductByNameAndCategoryValidator = [
     query("cName")
    .notEmpty()
    .withMessage("Category name should not be empty!")
    .isString()
    .withMessage("Category Name should consist of letters!"),

    query("pName")
    .notEmpty()
    .withMessage("Product name should not be empty!")
    .isString()
    .withMessage("Product Name should consist of letters!")
]