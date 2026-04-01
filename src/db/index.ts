import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

export async function connectDB(){
    try{
        const connectionInstance = await mongoose.connect(process.env.MONOGODB_URI as string)
        console.log(`Connected to mongoDB, Host:${connectionInstance.connection.host}`)

    }catch(err){
        console.log(`Error in MongoDB connection, ${err}`)
        process.exit(1)
    }
}