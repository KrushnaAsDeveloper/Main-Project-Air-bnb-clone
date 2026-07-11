import express from "express";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"

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
  console.log(user)
  console.log(Error.message)

  res.status(200).json({done : "User Registerd !"})
});
