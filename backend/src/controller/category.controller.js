const {apiResponse} = require("../utils/apiResponse");
const {customError} = require('../utils/customError');
const {asynchandeler} = require('../utils/asynchandeler');
const {validateCategory} = require('../validation/category.validation');
const categoryModel = require("../models/category.model");
const {uploadCloudinaryFile} = require('../helpers/cloudinary');
const {deleteCloudinaryFile} = require('../helpers/cloudinary');

const slugify = require('slugify'); //todo: You can install this (npm i slugify) or do it manually

//todo:create category
exports.createCategory = asynchandeler(async (req, res) => {
    // 1. Get validated body data
    const value = await validateCategory(req);
    
    // 2. Identify the file path (handling the array structure we saw earlier)
    const localFilePath = req.files?.image?.[0]?.path || req.file?.path;

    if (!localFilePath) {
        throw new customError(400, "Image file is required");
    }

    // 3. Upload to Cloudinary
const cloudinaryResponse = await uploadCloudinaryFile(localFilePath);

// CHECK: Did Cloudinary actually return a URL?
if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
    throw new customError(500, "Failed to upload image to Cloudinary");
}

// 4. Create the Category in DB
const newCategory = await categoryModel.create({
    name: value.name,
    slug: value.slug || slugify(value.name, { lower: true }), 
    image: cloudinaryResponse.secure_url, // Now we know this exists
});

    // 5. Send Response
    res.status(201).json(new apiResponse(201, newCategory, "Category created successfully"));
});



//todo:get all cateogory
exports.getAllCategory=  asynchandeler(async(req,res)=>{
    const allCategory = await categoryModel.find().sort({createdAt: -1});
    if(! allCategory) throw new customError(501,"all category failed!");
    apiResponse.sendSuccess(res,200,allCategory,"all category get successfully");
})


//todo:single category
exports.singleCategory = asynchandeler(async(req,res)=>{
   const {slug}= req.params;
   if(!slug) throw new customError(400,"slug is not found");
   const category= await categoryModel.findOne({slug});
   if(!category) throw new customError(501,"category not found !!");
   apiResponse.sendSuccess(res,200,"category retrive successfully",category);
})

//todo:update category
exports.updateCategory = asynchandeler(async (req, res) => {
    const { slug } = req.params;
    if (!slug) throw new customError(400, "slug is not found");

    const category = await categoryModel.findOne({ slug });
    if (!category) throw new customError(404, "category not found !!"); // Changed 501 to 404

    // Update name if provided
    if (req.body.name) {
        category.name = req.body.name;
    }

    // Check if a new image was uploaded
    // Note: use req.files if using .fields() or .array() in multer
    if (req.files && req.files.image && req.files.image.length > 0) {
        
        // 1. Delete old image from Cloudinary
        if (category.image?.public_id) {
            await deleteCloudinaryFile(category.image.public_id);
        }

        // 2. Upload new image
        const uploadedImage = await uploadCloudinaryFile(req.files.image[0].path);
        if (!uploadedImage) throw new customError(401, "image upload failed !!");
        
        category.image = uploadedImage;
    }

    await category.save();
    apiResponse.sendSuccess(res, 200, "category update successfully", category);
});

//todo:delete category
exports.deleteCategory = asynchandeler(async (req, res) => {
    const { slug } = req.params;
    if (!slug) throw new customError(400, "slug is not found");

    const category = await categoryModel.findOne({ slug });
    if (!category) throw new customError(404, "category not found !!");

    // 1. Delete from Cloudinary
    if (category.image?.public_id) {
        await exports.deleteCloudinaryFile(category.image.public_id);
    }

    // 2. Delete from MongoDB (CRITICAL STEP)
    await categoryModel.deleteOne({ slug });

    apiResponse.sendSuccess(res, 200, "category delete successfully", category);
});
