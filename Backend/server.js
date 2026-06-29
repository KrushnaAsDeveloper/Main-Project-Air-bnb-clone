import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cors from "cors";
import mongoose, { get } from "mongoose";
import Listing  from "./model/listing.js";
import User from "./model/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { protect } from "./middlewares/middleware.js";
const port = 5000;
const app = express();



app.use(cors());
// app.use(cors({
//   origin: "http://localhost:5173", // your frontend URL
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));
app.use(express.urlencoded({extended: true}))
app.use(express.json());


mongoose.connect(process.env.MONGO_URL).then(()=>console.log("mongoose connected"))


// get - /listings
app.get("/listings", protect,  async (req, res)=>{
    const myListing = await Listing.find({owner : req.user.userId});
    
    res.json(myListing);
})
app.get("/listings/my", protect, async (req, res)=>{
    const myListing = await Listing.find({owner : req.user.userId});
    res.json(myListing)
})
app.get("/listings/:id", async (req,res)=>{
    let id = req.params.id;
    const singleList = await Listing.findById(id);

    res.json(singleList);
})
// post - /listings
app.post("/listings", protect , async(req, res) =>{
    const newListing =  new Listing({...req.body.form, owner : req.user.userId});
    await newListing.save()
    res.json({newListing}); 
})
// put - /listing/:id
app.put("/listings/:id", protect, async (req, res)=>{
    let id = req.params.id;
    let updateList = await Listing.findByIdAndUpdate(id, req.body, {new:true} )
    res.json(updateList)
})
// delete = /listing/:id
app.delete("/listings/:id", protect,  async (req, res)=>{
     let id = req.params.id;
     let deletedList = await Listing.findByIdAndDelete(id)
     res.json(deletedList)
})

app.post("/register", async (req, res)=>{
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

    
})
app.post("/login", async (req, res)=>{
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
    
})
app.listen(process.env.PORT || 3000 , ()=>{
    console.log(`http://localhost:${process.env.PORT || 3000}`);
})