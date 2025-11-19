import mongoose from "mongoose";
import { dbName } from "../dbName.js";

const dbConnection = async ()=>{
    try {
        const dbConnect = await mongoose.connect(`${process.env.DB_URL}/${dbName}`);
        console.log(`DB Connection Successfully !! DB Host: ${dbConnect.connection.host}`);
    } catch (error) {
        console.log(`DB Error: ${error}`);
        
    }
}

export default dbConnection;