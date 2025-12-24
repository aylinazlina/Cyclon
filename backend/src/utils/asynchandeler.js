
//todo:this is the wrapper that catches async error
exports.asynchandeler=(func)=>{
    return async(req,res,next)=>{
        try{
            await func(req,res,next)
        }catch(err){
            next(err)
        }
    }
}