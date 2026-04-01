import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt, {type SignOptions, type Secret} from "jsonwebtoken"

export interface IUser {
    email:string
    password:string
    fullname:string
    role:string
    isActive:Boolean
    phone?:string
    refreshToken?:string
}

export const userSchema:Schema = new Schema<IUser>({
    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["Viewer","Analyst","Admin"]
    },
    isActive:{
        type:Boolean,
        required:true,
        default:true
    },
    phone:String,
    refreshToken:{
        type:String
    }

},{timestamps:true})

userSchema.methods.comparePassword = async function comparePassword(pass:string){
    return await bcrypt.compare(pass,this.password)
}

userSchema.pre('save',async function hashPassword(next) {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password as string,10)
})

userSchema.methods.generateAccessToken = function () {
    const payload = {
        _id: this._id,
        fullname: this.fullname,
        isActive: this.isActive,
        role: this.role
    }

    const options: SignOptions = {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any
    }

    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET_KEY as Secret,
        options
    )
}

userSchema.methods.generateRefreshToken = function () {
    const payload = {
        _id:this._id,
        fullname: this.fullname,
        email:this.email,
        role:this.role
    }

    const options:SignOptions = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any
    }

    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET_KEY as Secret,
        options 
    )
}

const userModel = mongoose.model('User',userSchema)
export {userModel};