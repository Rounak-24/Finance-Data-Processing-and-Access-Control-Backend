import { type Response, type Request, type NextFunction } from "express"
import { ApiError } from "./apiError.js"

type asyncFunction = (req:Request, res:Response, next:NextFunction)=> any  
type asyncHandlerFunction = (fn:asyncFunction) => any

export const asyncHandler:asyncHandlerFunction = (fn:asyncFunction)=> 
    async (req:Request, res:Response, next?:NextFunction)=>{
    try{
        await fn(req,res,next as NextFunction)

    }catch(err){
        console.log(`Error in asyncHandler, ${err}`)
        res.status(500).json(
            new ApiError(500,"Internal Server Error :(",err as [])
        )
    }
}