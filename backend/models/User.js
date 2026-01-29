import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        profileImageUrl:{
            type:String,
           default:null
        },
        
    },{timeStamps:true}
)

export const User = mongoose.model("User",UserSchema)