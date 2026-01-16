const express= require("express");
const _= express.Router();
const authController = require("../../controller/test_controller");
const {authGuard} = require("../../middleware/authGuard.middleware");
const categoryController= require("../../controller/category.controller");
const {upload} = require("../../middleware/multer.middleware");
const {multerError} = require('../../middleware/multerError.middleware');

_.route('/create-category').post(upload.fields([{
    name:"image" ,maxCount:1
}]),multerError,categoryController.createCategory);


module.exports = _;