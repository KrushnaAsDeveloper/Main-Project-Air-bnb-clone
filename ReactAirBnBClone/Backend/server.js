import express from "express";
import cors from "cors";
import mongoose, { get } from "mongoose";
import Listing  from "./model/listing.js";
const port = 5000;
const app = express();
import dotenv from "dotenv"
dotenv.config()

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());


mongoose.connect(process.env.MONGO_URL).then(console.log("mongoose connected"))


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
app.listen(port , ()=>{
    console.log(`http://localhost:${port}`);
})