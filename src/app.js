import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express()

app.use(cors({
    // origin: process.env.CORS_ORIGIN,
    origin: '*',
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import companyRouter from "./routes/company.routes.js";


//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/company",companyRouter)

export {app}

