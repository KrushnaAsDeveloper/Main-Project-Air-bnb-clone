import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true, 
        unique : true, 
        lowercase : true, 
        trim :true
    }, 
    username : {
        type : String,
        required : true, 
        unique : true,
        trim : true

    }, 
    password :{
        type : String,
        required : true, 
        minlenght : 6

    }
}, {Timestamp : true})

 const User = mongoose.model("User", userSchema);

export default User;