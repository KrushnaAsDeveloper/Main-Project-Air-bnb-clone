import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRATE,
//   upload_prefix: `cloudinary://${process.env.CLOUD_API_KEY}:${process.env.CLOUD_API_SECRATE}@${process.env.CLOUD_NAME}?secure_distribution=mydomain.com&upload_prefix=https://api-eu.cloudinary.com
// `    
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null
    const response = await cloudinary.uploader.upload(localFilePath, {resource_type : "auto"})
    
    console.log("file upload successfully ")
    return response
    } catch (error) {
          fs.unlinkSync(localFilePath)      
          return null
    }

}


export {uploadOnCloudinary}