const UserModel = require('../models/user.model');
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
    const user=await new UserModel({
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


//todo:login
exports.login=asynchandeler(async(req,res)=>{
   const validatedData=await validateUser(req);
   const {email,phoneNumber,password}=validatedData;
   //todo: Find the user
   const user = await UserModel.findOne({$or:[{email:email},{phoneNumber:phoneNumber}]});
   const isPasswordMatch = await user.compareHashPassword(password);

   //todo:check if user exsists and password matches
   if(!user || !isPasswordMatch){
      throw new customError(400,"Your Password or email does not match");

   }
   // console.log(isPasswordMatch);

   //todo:make an access and refresh token
   const accessToken=await user.generateAccessToken();
   const refreshToken=await user.generateRefreshToken();
    console.log(accessToken,refreshToken);
   //todo:Send success response
   return apiResponse.sendSuccess(res, 200, "Login Successful", {
        user: { firstName: user.firstName, email: user.email },
        accessToken,
        refreshToken
    });
  


});