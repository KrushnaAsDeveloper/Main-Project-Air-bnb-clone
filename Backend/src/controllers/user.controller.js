import express from "express";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) =>{
  try {
    const user = await User.findById(userId);
    const accessToken =  user.genrateAccessToken()
    const refreshToken =  user.genrateRefreshToken()
  
    user.refreshToken = refreshToken
    await user.save({validateBeforeSave : false})
  
    return {accessToken, refreshToken}
  } catch (error) {
    throw new ApiError(500, error.message || 'Error while generating access and refresh tokens')
  }
  
}
// register controller
export const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  
  if([email, username, password].some((field)=> field?.trim() == "")){
    throw new ApiError(400, "All feilds are required !")
  }

  
  const existedUser = await User.findOne({$or:[{username}, {email}]})
  if(existedUser){
    throw new ApiError(400, "User existed!");
    
  }

  const user=  await User.create({email, username, password})
  


  res.status(200).json(
    new ApiResponse(200, "User created successfully", user)
  )
});


// login controller
export const loginUser = asyncHandler( async (req, res)=>{
    const {email, password} = req.body;
    if (!email){
      throw new ApiError(401, "Email is required !");
      
    }
    const user = await User.findOne({email})
    if(!user){
      throw new ApiError(404, "User Not Existed ! Please Register")
    }
    // compare entered password with existed password 
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Password is incorrect !")
    }

    /// generate access and refresh token 
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);
    const updatedUser = await User.findOne(user._id).select('-password -refreshToken')
    
    // cookies options
    const options = {
      httpOnly : true, 
      secure : true
    }
    res
    .status(201)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(new ApiResponse(200, 'Your Logged in', {user : accessToken, refreshToken, updatedUser }))


})
