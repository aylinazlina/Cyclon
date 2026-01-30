const {customError} = require('../utils/customError');
require("dotenv").config();
const fs= require('fs');
// todo:cloudinary node.js sdk(cloudinary node integreation documentation)
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY
});

//todo:upload image into cloudinary
exports.uploadCloudinaryFile = async (filePath) => {
    try {
        if (!filePath || !fs.existsSync(filePath)) {
            return null; 
        }

        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: 'image',
            quality: "auto",
        });

        if (response) {
            fs.unlinkSync(filePath);
            // Match what your controller expects: secure_url
            return { 
                public_id: response.public_id, 
                secure_url: response.secure_url 
            };
        }
        return null;
    } catch (error) {
        // Clean up the file if it exists
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        // Log the ACTUAL error to your console so you can see why Cloudinary rejected it
        console.error("Cloudinary SDK Error:", error.message);
        
        return null; // Return null so the controller can handle the error properly
    }
};

//todo:delete cloudinary image
exports.deleteCloudinaryFile = async (public_id) => {
    try {
        if (!public_id) return null;

        // destroy only takes public_id and a few specific options (like resource_type)
        const response = await cloudinary.uploader.destroy(public_id, {
            resource_type: "image"
        });
        
        return response;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error.message);
        return null; // Don't throw a customError here, handle the null in controller if needed
    }
};
