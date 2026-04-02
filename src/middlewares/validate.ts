import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { type AnyZodObject } from "zod/v3";

export const validate = (schema:AnyZodObject)=>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        try{
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            })

            return next()

        }catch(err){
            if(err instanceof ZodError){
                const errorMessages = err.message
                return res.status(400).json({
                    success:false,
                    error:"Invalid input data",
                    details:errorMessages
                })
            }

            next(err)
        }
    }
}
    