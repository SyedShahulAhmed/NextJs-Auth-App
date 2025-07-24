import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please provide name"],
        unique : true
    },
    email : {
        type : String,
        required : [true,"Please provide email"],
        unique : true
    },
    username : {
        type : String,
        required : [true,"Please provide username"],
        unique : true
    },
    number : {
        type : Number,
        required : [true,"Please provide number"],
        unique : true
    },
    password : {
        type : String,
        required : [true,"Please provide password"],
    },
    isVerified : {
        type : Boolean,
        default : false,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date,
})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User;