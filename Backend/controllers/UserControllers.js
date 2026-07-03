import express from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = async (req, res)=>{
    try {
        // get all the inputs from body
        const {email, username, password } = req.body;
// check for email duplications
    const duplicate = await User.findOne({email})
    if(duplicate){
       return res.status(400).json({msg : "email already existed!"})
    }
// hashed the password using bcrypt.hash
    const hashedPassword = await bcrypt.hash(password ,10);
// create and saved the new user by saving the password in the hasedform
    const newUser = new User({email, username,  password : hashedPassword})
    newUser.save().then(res=>{
        console.log(res);
        
    })
// make a token 
    const token = jwt.sign(
        {userId : newUser._id, email : newUser.email}, 
        process.env.JWT_SECRET, 
        {expiresIn : "7d"}

    )
// now send the token back to the 
    res.status(201).json({
        
        token, 
        user :{userId : newUser._id, username : newUser.username, email : newUser.email}
    }
    )
    } catch (error) {
         res.status(500).json({ message: "Server error", error: err.message })
    }

    
}

export const Login = async (req, res)=>{
   try {
     const findUser = await User.findOne({email : req.body.email})
    if(!findUser){
       return res.status(400).json({
            msg : "email not found !"
        })
    }

    const isMatched = await bcrypt.compare(req.body.password, findUser.password)
    if(!isMatched){
       return res.status(400).json({
            msg : "Password is invalid !"
        })
    }
    
    const token = jwt.sign(
        {userId:findUser._id, email : findUser.email, username : findUser.username}, 
        process.env.JWT_SECRET, 
        {expiresIn : "7d"}
    )

    res.status(201).json({
        token, 
        user :{userId : findUser._id, username : findUser.username, email : findUser.email}
        
    })
   } catch (error) {
    res.status(400).json({
        msg : "invalid inpute !"
    })
   }
    
}