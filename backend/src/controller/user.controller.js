const UserModel = require('../models/user.model');
const {apiResponse} = require('../utils/apiResponse');
const {customError} = require('../utils/customError');
const {asynchandeler} = require('../utils/asynchandeler');
const {validateUser}=require('../validation/user.validation');
const {RegistrationTemplate} = require('../template/Template');
const {ResetPasswordEmailTemplate}=require('../template/Template');
const {emailSend}= require('../helpers/helper');
const crypto = require('crypto');





//todo:registration user

exports.registration=asynchandeler(async(req,res)=>{

   const validatedData=await validateUser(req);
   const {firstName,email,password}=validatedData;
   
   //todo:save the user inofo into database
    const finduser=await new UserModel({
    firstName,
    email,
    password
   }).save();
   

   if(!finduser){
    throw new customError(500,"user registration failed Try again later");
   }

   //todo:random OTP generate
   const otp= crypto.randomInt(100000,999999) ;
   //todo:otp saving in the database
   finduser.resetPasswordOTP = otp;
   console.log(otp);
   const expireTime=Date.now() + 10 * 60 * 60 * 1000;
   const verifyLink=`https://form.com/verify-email/${email}`;
   const template =RegistrationTemplate(firstName,verifyLink,otp,expireTime);
   await emailSend(email,template);
   finduser.resetPasswordExpireTime = expireTime;
   //todo:saving otp and expire time to database
   await finduser.save()
   
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
   const finduser = await UserModel.findOne({$or:[{email:email},{phoneNumber:phoneNumber}]});
   const isPasswordMatch = await finduser.compareHashPassword(password);

   //todo:check if user exsists and password matches
   if(!finduser || !isPasswordMatch){
      throw new customError(400,"Your Password or email does not match");

   }
   // console.log(isPasswordMatch);

   //todo:make an access and refresh token
   const accessToken=await finduser.generateAccessToken();
   const refreshToken=await finduser.generateRefreshToken();

   const isProduction=process.env.NODE_ENV == "production";
   
   res.cookie("refreshToken",refreshToken,{
      httpOnly: true ,
      secure: isProduction ? true : false , //todo:http / https
      sameSite:"lax",
      path: "/" ,
      maxAge: 7 * 24 * 60 *60 *1000, //todo:7days

   });

    console.log(accessToken,refreshToken);

    //todo:now save refresh token into database


   finduser.refreshToken=refreshToken;
   await finduser.save();

   //todo:Send success response
   return apiResponse.sendSuccess(res, 200, "Login Successful", {
        user: { firstName: finduser.firstName, email: finduser.email },
        accessToken,
        refreshToken
    });
  


});


//todo:email verification
exports.emailVerification=asynchandeler(async(req,res)=>{
   const {otp,email} = req.body;
   console.log(otp,email);
   if (!otp && !email){
      throw new customError(401,"Otp or email not found");

   }

   const findUser=await UserModel.findOne({
      $and:[{email:email,},{resetPasswordOTP:otp,},{resetPasswordExpireTime:{$gt:Date.now() }}]
   
   
   });
   if(!findUser){
      throw new customError(401,"Otp or Time expire.Try Again!!");
   }
   
   //todo:after verification clearing 
   findUser.resetPasswordOTP = null;
   findUser.resetPasswordExpireTime = null;
   findUser.isEmailVerified = true;

   apiResponse.sendSuccess(res,200,"Email verified successfully",{
      email:findUser.email,
      firstName:findUser.firstName,
   });
   console.log(findUser);
})


//todo:forgot password
exports.forgetPassword=asynchandeler(async(req,res)=>{

  const {firstName,email}=req.body;

  if(!email){
   throw new customError(401,"eamil missing");
  }
 const finduser=await UserModel.findOne({email:email});

 if(!finduser){
   throw new customError(401,"user not found");
 }

 //todo:random OTP generate
 const otp = crypto.randomInt(100000,999999);
 const expireTime = Date.now() + 10 * 60 * 60 * 1000;
 const verifyLink ='http://form.com/resetpassoword/${email}';
 const template = ResetPasswordEmailTemplate(firstName,verifyLink,otp,expireTime);
 await emailSend(email,template);

 apiResponse.sendSuccess(res,301,"check your email",null);



})


//todo:reset password

exports.resetPassword=asynchandeler(async(req,res)=>{
   const {email,newPassword,confirmPassword}=req.body;
   if(!email){
      throw new customError(401,"email missing");
   }
   if(!newPassword){
      throw new customError(401,"new password missing");
   }
   if(!confirmPassword){
      throw new customError(401,"confirm password missing");
   }
   if(newPassword !== confirmPassword ){
      throw new customError(401,"newPassword or confirm passowrd does not match");
   }

   //todo: find the user

   const finduser= await UserModel.findOne({email});
   if(!finduser){
      throw new customError(401,"user not found ");
   }

   finduser.password == newPassword;
   finduser.resetPasswordOTP  = null;
   finduser.resetPasswordExpireTime = null;

   await finduser.save();
   
   apiResponse.sendSuccess(res,200,"password reset successfull",finduser);



})

//todo:logout user
exports.logoutuser=asynchandeler(async(req,res)=>{

   const findUser=await UserModel.findById(req.user.email);
   console.log(req.user);
   if(!findUser){
      throw new customError(401,"User not found");
   }

//   if(!refreshToken){
//    throw new customError(401,"refresh token missing");
//   }

  //todo:clear the cookies
  res.clearCookie("refreshToken" , {
   httpOnly: true,
   secure:isProduction ? true : false,
   samSite: "none" ,
   path: "/", //This must match the path used when setting the cookie
  }) ;

  //todo:find the user
  findUser.refreshToken = null ;
  await findUser.save() ;
  apiResponse.sendSuccess(res,200,"Logout Successfull", findUser);




});


//todo:get me controller

exports.getMe=asynchandeler(async(req,res)=>{

    const id=req.user.id;
    const findUser=await UserModel.findById(id);
    if(!findUser){
      throw new cutomError(401,"User not found");
    }

   apiResponse.sendSuccess(res,200,"User found successfully",findUser);


})
