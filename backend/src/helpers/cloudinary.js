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
    console.log("Attempting to upload path:", filePath); // DEBUG THIS
    try {
        // Fix: Check if filePath is missing OR if the file doesn't exist on disk
        if (!filePath || !fs.existsSync(filePath)) {
            throw new customError(400, "File path is invalid or file does not exist");
        }

        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: 'image',
            quality: "auto",
        });

        if(response){
             // Clean up: Delete the local temp file after upload
            fs.unlinkSync(filePath);
            return {publicIP : response.public_id ,url :response.secure_url}
        }
       
        

        return response; // You MUST return this to get the URL in your controller
    } catch (error) {
        
        if(fs.existsSync(filePath)){
             // Clean up: Delete the local temp file after upload
            fs.unlinkSync(filePath);
            return {publicIP : response.public_id ,url :response.secure_url}
        }

        // Clean up temp file even if upload fails
        // if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
        
        throw new customError(500, "Cloudinary Upload Failed: " + error.message);
    }
}
