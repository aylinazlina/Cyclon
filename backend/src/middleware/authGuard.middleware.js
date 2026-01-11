const {customError} = require("../utils/customError");
const jwt = require("jsonwebtoken");
const UserModel=require('../models/user.model')

exports.authGuard = async (req,_,next)=>{
    const token = req.headers.authorization || req.body ?.token;
    if(token){
      const decodedToken= jwt.verify(token,process.env.ACCESSTOKEN_SECRET);
      console.log(decodedToken);
    if(!decodedToken){
        throw new customError(401,"Unauthorized Access Token Missing");    
    }
     const findUser = await UserModel.findById(decodedToken.userId);
    if(!findUser){
        throw new customError(401,"User not Found!");
    }else{
        
       let obj = {} ;
       obj.id = findUser._id;
       obj.email = findUser.email;
       obj.role = findUser.role;
       req.user = obj;
       next();
    }
    //todo:attach user to req object
     req.user = findUser ;

    }else{
        throw new customError(401,"Token Not Found");
     }




    
}



