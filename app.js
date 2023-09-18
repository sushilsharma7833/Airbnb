// Dotenv
import dotenv from 'dotenv'       
import express from "express";
import cors from 'cors';    //Solving errors while connecting --back end to front end.
import newUser from "./routes/newUser.js"
import loggeduser from "./routes/loggeduser.js"
import authenticateUser from './utils/middleware.js';

import cookieParser from 'cookie-parser';
import session from 'express-session';

import{join} from "path"
import connectDB from "./config/connectdb.js";
const app = express();

const PORT = process.env.PORT ||3001;
const MONGODB_URL = process.env.MONGODB_URL
dotenv.config({
    path: "./config.env"
})
// CORS Policy  - used for connecting backend to frontend smoothly
app.use(cors());

//used for using res.cookie
app.use(cookieParser());

//
app.use(session({
    secret:"JWT_SECRET_KEY",
    saveUninitialized: true,
    resave:false,

}));

//storing uploading images
app.use((req,res,next)=>{
res.locals.message = req.session.message;
delete req.session.message;
next();
});
// console.log(join(process.cwd(),"public","css"))
app.use(express.static(join(process.cwd(),"public")))


// solving error in new version
import mongoose from 'mongoose'
mongoose.set('strictQuery', true);

// Database Connection
connectDB(MONGODB_URL)
// Set Template Engine
app.set("view engine",'ejs')


app.use(express.json());
app.use(express.urlencoded({ extended: false}));
// Load Routes
app.use("/", newUser)
app.use("/authuser",authenticateUser,loggeduser)
 

const start =async () => {
    try{
        // await connectDB()
        app.listen(PORT,()=>{
            console.log(`listening at  http://localhost:${PORT}`)
        })
    }catch(err){
        console.log(err)
    } 
}
start()