import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cors from "cors";
import mongoose, { get } from "mongoose";
import Listing  from "./model/listing.js";
import User from "./model/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const port = 5000;
const app = express();


app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());


mongoose.connect(process.env.MONGO_URL).then(()=>console.log("mongoose connected"))


// get - /listings
app.get("/listings", async (req, res)=>{
    const allListings = await Listing.find();
    res.json(allListings);
})
app.get("/listings/:id", async (req,res)=>{
    let id = req.params.id;
    const singleList = await Listing.findById(id);

    res.json(singleList);
})
// post - /listings
app.post("/listings", async(req, res) =>{
    const newListing = await new Listing(req.body.form);
     newListing.save().then(res =>{
        console.log(res)
    })
    res.json({newListing}); 
})
// put - /listing/:id
app.put("/listings/:id", async (req, res)=>{
    let id = req.params.id;
    let updateList = await Listing.findByIdAndUpdate(id, req.body, {new:true} )
    res.json(updateList)
})
// delete = /listing/:id
app.delete("/listings/:id", async (req, res)=>{
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
        user :{id : newUser._id, username : newUser.username, email : newUser.email}
    }
    )
    } catch (error) {
         res.status(500).json({ message: "Server error", error: err.message })
    }

    
})
app.post("/login", async (req, res)=>{
    const findUser = await User.findOne(req.body.email)
    if(!findUser){
       return res.status(400).json({
            msg : "email not found !"
        })
    }
    const hashedPassword = bcrypt.hash(req.body.password);

    const enteredPass = bcrypt.compare(req.body.password, hashedPassword)

    
    
})
app.listen(process.env.PORT || 3000 , ()=>{
    console.log(`http://localhost:${process.env.PORT || 3000}`);
})