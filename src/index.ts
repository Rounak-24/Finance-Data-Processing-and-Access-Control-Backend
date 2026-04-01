import { app } from "./app.js";
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";
dotenv.config()

const port = process.env.PORT as string

connectDB().then(()=>{
    app.on("error" as "mount",(err)=>{
        console.log(err)
        throw err
    })

    app.listen(port,()=>{
        console.log(`Server is listening on port ${port}`)
    })
}).catch((err)=>{
    console.log(`Error for connectDB execution, Error:${err}`)
})

app.get('/',(req,res)=>{
    res.send(`Backend is running`)
})



