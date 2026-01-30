const {apiResponse} = require("../utils/apiResponse");
const {asynchandeler} = require('../utils/asynchandeler');
const {customError} = require('../utils/customError');
const subCategoryModel = require('../models/subcategory.model');
const {validateSubCategory} = require('../validation/subcategory.validation');


// todo:create subcategory
exports.createSubCategory = asynchandeler(async (req, res) => {
    const value = await validateSubCategory(req);

    // This check is now passing because of Multer
    if (!req.file) throw new customError(400, "Image file is required");

    // Logic: Upload req.file.path to Cloudinary here to get public_id and secure_url
    // const result = await uploadOnCloudinary(req.file.path);

    const subCategoryData = {
        name: value.name,
        category: value.category,
        slug: value.name.toLowerCase().split(' ').join('-'), // Manual slug to bypass validation
        image: {
            public_id: "replace_with_cloudinary_id", 
            secure_url: "replace_with_cloudinary_url"
        }
    };

    const sc = await subCategoryModel.create(subCategoryData);
    
    if(!sc) throw new customError(500, "Subcategory creation failed");
    
    res.status(201).json(new apiResponse(201, sc, "Subcategory created successfully"));
});


//todo:get all sub category
exports.getallSubCategory = asynchandeler(async(_,res)=>{
    const sc= await subCategoryModel.find();
    if(!sc) throw new customError(401,"category not found!!");
    apiResponse.sendSuccess(res,200,"subcategory retrive successfull",sc);
})


//todo:get single sub category

exports.getSingleCategory = asynchandeler(async(req,res)=>{
    const {slug}= req.params;
    if(!slug) throw new customError(400,"slug not found");

     const sc = await subCategoryModel.findOne({slug}).populate({
        path:"category",
        select:"-subcategory"
    });
    if(!sc) throw new customError(404, "single subcategory not found");
    apiResponse.sendSuccess(res,200,"single subcategory retrive successfull",sc);
})