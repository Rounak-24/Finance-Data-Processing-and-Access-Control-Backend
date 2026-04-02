import type { NextFunction, Request, Response } from "express"
import { ApiError } from "../utils/apiError.js"
import { userModel } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

declare global{
    namespace Express{
        interface Request {
            user?:any
        }
    }
} 

interface IDecodedPayload {
    _id:string,
    fullname:string,
    isActive: boolean,
    role: string
}

export const jwtAuthMiddleware = async (req:Request, res:Response, next:NextFunction)=>{
    try{    
        const auth = req.headers.authorization || req.cookies?.accessToken
        if(!auth) return res.status(401).json(
            new ApiError(401,"Unauthorized Request")
        )

        const token:string = auth.split(' ')[1]
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY as string) as IDecodedPayload

        if(!decoded.isActive){
            return res.status(403).json(
                new ApiError(403,"Inactive User!")
            )
        }
        
        const User = await userModel.findById(decoded._id).select(
            '-refreshToken -password'
        )

        if(!User) return res.status(404).json(
            new ApiError(404,"User not found!")
        )
        else req.user = User;

        next()

    }catch(err){
        console.log(`Error in jwt middleware, Error: ${err}`)
        res.status(500).json(
            new ApiError(500,"Internal Server Error for auth middleware")
        )
    }
}