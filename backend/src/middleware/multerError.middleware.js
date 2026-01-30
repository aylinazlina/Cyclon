const {asynchandeler} = require('../utils/asynchandeler');

exports.multerError =(error,req,res,next)=>{
   
    if(error){
       
        //Send a proper response
        return res.status(400).json({
            success:false,
            message:error.message || "Multer error occurred",
        });
        throw new cutomError(401,error.message);
    }
    next();
};