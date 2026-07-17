import User from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
export const protect = asyncHandler( async (req, res, next)=>{
   
       try {
         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
         console.log(token)
         if(!token){
             throw new ApiError(401, "Unauthorize usereeeeee")
         }
     
         const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
     
         const user = await User.findById(decode._id).select("-password -refreshToken")
         if(!user){
             throw new ApiError(401, "Invalid access token")
         }
         req.user = user
     
         next()
       } catch (error) {
        throw new ApiError(401, "invlid access token")
       }
    
})

