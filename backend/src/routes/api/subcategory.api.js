const express= require("express");
const _= express.Router();
const authController = require("../../controller/test_controller");
const {authGuard} = require("../../middleware/authGuard.middleware");
const subcategoryController= require("../../controller/subcategory.controller");
const {upload} = require("../../middleware/multer.middleware");
const {multerError} = require('../../middleware/multerError.middleware');

// It must be 'image' because your validation looks for req.files.image
_.post('/create-subcategory', upload.single('image'), subcategoryController.createSubCategory);

_.route('/get-all-subcategory').get(subcategoryController.getallSubCategory);
_.route('/get-single-subcategory/:slug').get(subcategoryController.getSingleCategory);



module.exports = _;