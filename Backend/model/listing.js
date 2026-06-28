import mongoose, { Schema } from "mongoose";

 const listingSchema = new Schema({
    name : {
        type : String
    }, 
    description : {
        type : String
    }, 
    image :{
        type : String, 
        default: "https://images.pexels.com/photos/8089172/pexels-photo-8089172.jpeg"
    }, 
    country : {
        type : String
    }, 
    location :{
        type :String
    }, 
    price : {
        type : Number
    }



 }
     
 )

const Listing = mongoose.model("Listing", listingSchema)
export default Listing

