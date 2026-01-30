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


_.route('/update-category/:slug').post(upload.fields([{
    name:"image" ,maxCount:1
}]),multerError,categoryController.updateCategory);



_.route('/get-all-category').get(categoryController.getAllCategory);
_.route('/single-category/:slug').get(categoryController.singleCategory);
_.route('/delete-category/:slug').delete(categoryController.deleteCategory);



module.exports = _;