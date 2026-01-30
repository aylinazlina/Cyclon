const joi = require("joi");
const { customError } = require("../utils/customError");

const subcategoryValidationSchema = joi
  .object({
    name: joi.string().trim().required().messages({
      "string.base": "Sub Category name must be a string.",
      "string.empty": "Sub Category name is required.",
      "any.required": "Sub Category name is required.",
      "string.trim": "Sub Category name should not contain extra spaces.",
    }),
  })
  .options({ abortEarly: false, allowUnknown: true });

//todo:Async funtion to validate category

exports.validateSubCategory = async (req) => {
  try {
    const value = await subcategoryValidationSchema.validateAsync(req.body);

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/gif"];

    // FIX: Check for single file (req.file) OR fields (req.files.image)
    const imageFile = req.file || (req.files && req.files.image ? req.files.image[0] : null);

    if (!imageFile) {
      throw new customError(400, "Image is required and not found.");
    }

    // Validate MimeType
    if (!allowedMimeTypes.includes(imageFile.mimetype)) {
      throw new customError(400, "Only JPG, JPEG, PNG, WEBP and GIF files are allowed");
    }

    // Validate Size (10MB)
    if (imageFile.size > 10 * 1024 * 1024) {
      throw new customError(400, "Image size must be below 10 MB");
    }

    // Return the validated data plus the file object
    return { 
        name: value.name, 
        category: req.body.category, // Don't forget to pass the category ID!
        imageFile: imageFile 
    };
    
  } catch (error) {
    if (error.statusCode) throw error;
    const errorMessage = error.details ? error.details[0].message : error.message;
    throw new customError(400, errorMessage);
  }
};
