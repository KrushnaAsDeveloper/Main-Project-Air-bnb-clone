import express from "express";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";

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

export const loginUser = asyncHandler( async (req, res)=>{
    const {email, password} = req.body;
    const existedUser = await User.findOne({email})
    if(!existedUser){
      throw new ApiError(401, "User Not Existed ! Please Register")
    }
    // compare entered password with existed password 
    const check = await existedUser.comparePassword(password);
    if (!check) {
      throw new ApiError(400, "Password is incorrect !")
    }

    //add refresh token 
    // add access token 
    const token = existedUser.genrateAccessToken()

    res.status(201).json(new ApiResponse(200, 'Your Loged in'))


})
