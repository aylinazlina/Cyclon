const joi = require("joi") ;
const {customError} = require("../utils/customError");

const categoryValidationSchema = Joi.object({
    name: joi.string().trim().required().messages({
        "string.base":"Category name must be a string.",
        "string.empty": "Category name is required.",
        "any.required" : "Category name is required.",
        "string.trim" : "Category name should not contain extra spaces.",
    }),
}).options({abortEarly:false,
    allowUnknown:true,
})


//todo:Async funtion to validate category

exports.validatedCategory = async (req)=>{
    try{
        const value = await categoryValidationSchema.validateAsync(req.body);
        return value;   
    }catch(error){
        console.log("Error from validateCategory: ",error);
        throw new customError(400,`Category Validation failed:${error.message}`);
    }
}