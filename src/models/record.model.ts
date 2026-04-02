import mongoose, { Schema } from "mongoose"
import type { IRecord } from "../types/interfaces.js";

export const recordSchema:Schema = new Schema<IRecord>({
    amount:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:["income","expense"]
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    date:{
        type:Date,
        required:true
    }

},{timestamps:true})

const record = mongoose.model('record',recordSchema)
export {record};