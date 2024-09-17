import express from 'express';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';
import courseRouter from './routes/courseRoutes.js';
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
const app=express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use("/api/admin",adminRouter);
app.use("/api/user",userRouter);
app.use("/api/course",courseRouter);

app.listen(4000,()=>{
    console.log("Server is running...");
})