class customError extends Error{
    constructor(statusCode,errorName,message){
        super(message);
       this.statusCode=statusCode;
       this.name=errorName || "Custom Error";
       this.status=statusCode >=200 && statusCode <500 ? "Client Error":"Server Error";
       this.message=message || "Server / Client Error";
       this.data =null;
       this.captureStackTrace(this,customError)
    }
}



module.exports={customError};