const { apiResponse } = require('../utils/apiResponse')
const { asynchandeler } = require('../utils/asynchandeler')
const { customError } = require('../utils/customError')

exports.sayHi=asynchandeler(async(req,res)=>{

       throw new customError(501,"clientError","email missing");

       // apiResponse.sendSuccess(res,201,"hi from test controller",{data:"data"});


//        return res.status(200).json({
//         msg:"hi from test controller",
//         status:"success",
//         data:"data",
//         statusCode:200,
//         errorTrace:""
// ,
//        })
        
    })
     
