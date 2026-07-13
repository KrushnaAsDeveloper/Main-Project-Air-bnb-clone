import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import {ApiError} from "./ApiError.js"

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRATE,
})

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) throw new ApiError(501, "error while uploading files")
    const response = await cloudinary.uploader.upload(localFilePath, {resource_type : "auto"})
    console.log("file upload successfully ")
    fs.unlinkSync(localFilePath)
    return response
    } catch (error) {
          fs.unlinkSync(localFilePath)   
          throw new ApiError(500, error) 
          return null
    }

}


export {uploadOnCloudinary}