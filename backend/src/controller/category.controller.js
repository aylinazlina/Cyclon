const {apiResponse} = require("../utils/apiResponse");
const {customError} = require('../utils/customError');
const {asynchandeler} = require('../utils/asynchandeler');
const {validateCategory} = require('../validation/category.validation');
const categoryModel = require("../models/category.model");

//todo:create category
exports.createCategory=asynchandeler(async(req,res)=>{
   const {name} = await validateCategory(req);
   console.log(name);


})