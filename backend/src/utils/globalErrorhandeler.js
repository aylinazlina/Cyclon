require("dotenv").config();

//todo:developement response
const developement=(error,res)=>{

     const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
       statusCode:error.statusCode,
       status:error.status,
       isOperationalError: error.isOperationalError,
       message:error.message,
       data:error.data,
       errorStack:error.stack, 
    });
}


//todo:production response
const production=(error,res)=>{
     const statusCode = error.statusCode || 500;
    if(error.isOperationalError){
        return res.status(statusCode).json({
            statusCode:error.statusCode,
            status:error.status,
            message:error.message,
        });
       
    }else{
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            statusCode:"!OK",
            message:"something went wrong try again later!",
        });
    }
}



exports.globalErrorHandeler=(error,req,res,next)=>{
    if(process.env.NODE_ENV == "developement"){
        developement(error,res);

    }else{
        production(error,res);
    }
}

