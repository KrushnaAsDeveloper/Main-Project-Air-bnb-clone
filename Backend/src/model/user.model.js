import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
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
        minlength : 6

    }
}, {timestamps : true})

userSchema.pre("save", async function() {
    if(!this.isModified("password")) return 
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.genrateAccessToken = function() {
    return jwt.sign(
        {
        _id : this._id, 
        username : this.username, 
        email : this.email,
        
    },  
    process.env.ACCESS_TOKEN_SECRET, 
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIREY
    }
    )
}
const User = mongoose.model("User", userSchema);

export default User;