import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI

export async function connectDB(){
    try{
        if (!mongoURI) {
            throw new Error("MONGODB_URI is not defined in environment variables.")
        }
        const connectionInstance = await mongoose.connect(mongoURI)
        console.log(`Connected to mongoDB, Host:${connectionInstance.connection.host}`)

    }catch(err){
        console.log(`Error in MongoDB connection, ${err}`)
        process.exit(1)
    }
}