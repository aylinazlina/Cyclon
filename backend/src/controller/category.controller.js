const {apiResponse} = require("../utils/apiResponse");
const {customError} = require('../utils/customError');
const {asynchandeler} = require('../utils/asynchandeler');

exports.createCategory=asynchandeler(async(req,res)=>{
   const value = await validateCategory(req);
   console.log(value);


})