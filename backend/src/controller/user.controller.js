const User = require('../models/user.model');
const {apiResponse} = require('../utils/apiResponse');
const {customError} = require('../utils/customError');
const {asynchandeler} = require('../utils/asynchandeler');
const {validateUser}=require('../validation/user.validation');

exports.registration=asynchandeler(async(req,res)=>{
   const validatedData=await validateUser(req);
   const {firstName,email,password}=validatedData;
   
   //todo:save the user inofo into database
    const user=await new User({
    firstName,
    email,
    password
   }).save();

   if(!user){
    throw new customError(500,"user registration failed Try again later");
   }
   apiResponse.sendSuccessResponse(res,201,"Registration Successfull",user);



})