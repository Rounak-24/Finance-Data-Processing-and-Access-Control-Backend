import type { NextFunction, Request, Response } from "express"
import { ApiError } from "../utils/apiError.js"
import { user } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import type { IAccessDecodedPayload } from "../types/interfaces.js"

export const jwtAuthMiddleware = async (req:Request, res:Response, next:NextFunction)=>{
    try{    
        const auth = req.headers.authorization || req.cookies?.accessToken
        if(!auth) return res.status(401).json(
            new ApiError(401,"Unauthorized Request")
        )

        const token:string = auth.split(' ')[1]
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY as string) as IAccessDecodedPayload

        if(!decoded.isActive){
            return res.status(403).json(
                new ApiError(403,"Inactive User!")
            )
        }
        
        const User = await user.findById(decoded._id).select(
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