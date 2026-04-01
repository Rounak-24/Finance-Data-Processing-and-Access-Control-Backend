import express from "express"
import type { Express, Request, Response } from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

export const app:Express = express()

const corsOptions = {
    origin:process.env.CORS_ORIGIN,
    credentials:true
}

const logRequest = (req: Request, res: Response, next:Function)=>{
    console.log(`Time:${new Date(Date.now())} ,Request made to ${req.url}`)
    next()
}

app.use(logRequest)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors(corsOptions))



