import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import UserRoutes from './Routes/UserRoutes.js'
dotenv.config();

const app = express();
app.use(express.json())
app.use(cors());

app.use('/user',UserRoutes);


const port = process.env.port || 5000;
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongodb connected")
}).catch((err)=>{
    console.log("error occured",err);
})

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})

