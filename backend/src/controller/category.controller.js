const {apiResponse} = require("../utils/apiResponse");
const {customError} = require('../utils/customError');
const {asynchandeler} = require('../utils/asynchandeler');
const {validateCategory} = require('../validation/category.validation');
const categoryModel = require("../models/category.model");
const {uploadCloudinaryFile} = require('../helpers/cloudinary');

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

    // 4. Create the Category in DB (including the missing SLUG)
    const newCategory = await categoryModel.create({
        name: value.name,
        // Generate slug from name if not provided in req.body
        slug: value.slug || value.name.toLowerCase().split(' ').join('-'), 
        image: cloudinaryResponse.secure_url,
        // ... any other fields
    });

    // 5. Send Response
    res.status(201).json(new apiResponse(201, newCategory, "Category created successfully"));
});