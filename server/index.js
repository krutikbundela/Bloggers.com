import express from 'express';
import { mongoose } from 'mongoose';
import  dotenv  from 'dotenv';
import UserRoutes from "./routes/user.routes.js"
import AuthRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";


dotenv.config();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log("MongoDB is Connected");
}).catch((err) =>{
    console.log(err);
})

const app = express();

//=====================================================

app.use(express.json());
app.use(cookieParser());


//=====================================================
app.listen(process.env.PORT, () =>{
    console.log("Sevrer is Running", process.env.PORT);
})


//======================================================

app.use("/api/user", UserRoutes)
app.use("/api/auth", AuthRoutes)

//======================================================

//Middleware For Error
app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})





