import express from 'express';
import { mongoose } from 'mongoose';
import  dotenv  from 'dotenv';
import UserRoutes from "./routes/user.routes.js"
import AuthRoutes from "./routes/auth.routes.js"


dotenv.config();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log("MongoDB is Connected");
}).catch((err) =>{
    console.log(err);
})

const app = express();

//=====================================================

app.use(express.json());


//=====================================================
app.listen(process.env.PORT, () =>{
    console.log("Sevrer is Running", process.env.PORT);
})


//======================================================

app.use("/api/user", UserRoutes)
app.use("/api/auth", AuthRoutes)