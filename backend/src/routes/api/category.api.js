const express= require("express");
const _= express.Router();
const authController = require("../../controller/test_controller");
const {authGuard} = require("../../middleware/authGuard.middleware");
const categoryController= require("../../controller/category.controller");


_.route('/create-category').post(categoryController.createCategory);


module.exports = _;