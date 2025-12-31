const User = require('../models/user.model');
const {apiResponse} = require('../utils/apiResponse');
const {customError} = require('../utils/customError');
const {asynchandeler} = require('../utils/asynchandeler');
const {validateUser}=require('../validation/user.validation');
const {RegistrationTemplate} = require('../template/template');
const {emailSend}= require('../helpers/helper');


//todo:registration user

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

  const verifyLink=`https://jwtsecrets.com/generator`;
   const template =RegistrationTemplate(firstName,verifyLink);
   await emailSend(email,template);
   apiResponse.sendSuccess(res,201,"Registration Successfull",{
      // todo:postman e jeno shudhu firstName are email ta dekhai
   firstName,email
   });



})