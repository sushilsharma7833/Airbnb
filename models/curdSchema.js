 import mongoose from "mongoose";

 const user_info = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{ 
         type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    created:{
        type:Date,
        required:true,
        default:Date.now,
    }

 });

 const userInfoModel = mongoose.model("Userinfo",user_info);

 export{userInfoModel};