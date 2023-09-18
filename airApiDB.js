import dotenv from 'dotenv'    
dotenv.config()  
const MONGODB_URL = process.env.MONGODB_URL

import connectDB from "./config/connectdb.js";

//targeting schema and .json file
import { Card} from './models/Schema.js';
// import airApiJson from "./airApi.json"
import airApiJson from './airApi.json' assert { type: "json" };

const share =async () => {
    try{
        await connectDB(MONGODB_URL)
        //creatin document 
        await Card.create(airApiJson)
       
            console.log('successed in sending AirApi-Cards to cluster')
        
    }catch(err){
        console.log(err)
    } 
}
share()

//run in terminal --node airApiDB